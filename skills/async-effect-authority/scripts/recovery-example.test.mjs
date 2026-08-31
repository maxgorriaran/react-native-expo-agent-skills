// Synthetic model, not a React hook or production retry utility. Node.js 20+, no dependencies.
import assert from 'node:assert/strict';
import test from 'node:test';

function deferred() {
  let resolve, reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}

function publisher() {
  let generation = 0;
  let live = true;
  let state = { status: 'idle' };
  return {
    state: () => state,
    retire() { live = false; generation += 1; },
    async run(load) {
      if (!live) return;
      const captured = ++generation;
      state = { status: 'pending' };
      const current = () => live && captured === generation;
      try {
        const value = await load();
        if (current()) state = { status: 'ready', value };
      } catch (error) {
        if (current()) state = { status: 'error', error };
      }
    },
  };
}

// Caller retains this schedule across renders for one owner, and calls cancel on retirement.
// Outcomes represent separate completed attempts; repeated scheduling cannot move a deadline.
// Numbers are illustrative policy, not recommended production timing.
function retrySchedule() {
  let deadline = null;
  let failures = 0;
  let live = true;
  return {
    snapshot: () => ({ deadline, failures }),
    schedule(now, outcome) {
      if (!live) return null;
      if (deadline !== null) return deadline;
      assert.ok(outcome === 'pending' || outcome === 'failed');
      if (outcome === 'failed') failures += 1;
      const delay = failures >= 2 ? 100 : 10;
      if (failures >= 2) failures = 0;
      deadline = now + delay;
      return deadline;
    },
    takeDue(now) {
      if (!live || deadline === null || now < deadline) return false;
      deadline = null;
      return true;
    },
    cancel() { live = false; deadline = null; },
  };
}

test('a newer request wins within the same owner; late success is ignored', async () => {
  const owner = publisher(), old = deferred(), latest = deferred();
  const a = owner.run(() => old.promise), b = owner.run(() => latest.promise);
  latest.resolve('new'); await b;
  old.resolve('old'); await a;
  assert.deepEqual(owner.state(), { status: 'ready', value: 'new' });
});

test('late errors cannot replace current success', async () => {
  const owner = publisher(), old = deferred();
  const a = owner.run(() => old.promise);
  await owner.run(() => 'new');
  old.reject(new Error('old failure')); await a;
  assert.deepEqual(owner.state(), { status: 'ready', value: 'new' });
});

test('retired owners cannot publish either outcome or start more work', async () => {
  for (const outcome of ['resolve', 'reject']) {
    const owner = publisher(), work = deferred();
    const run = owner.run(() => work.promise);
    owner.retire();
    const before = owner.state();
    work[outcome](outcome === 'resolve' ? 'old' : new Error('old'));
    await run;
    await owner.run(() => assert.fail('retired owner started work'));
    assert.equal(owner.state(), before);
  }
});

test('current error is visible and a later current attempt can recover', async () => {
  const owner = publisher(), error = new Error('current failure');
  await owner.run(() => { throw error; });
  assert.deepEqual(owner.state(), { status: 'error', error });
  await owner.run(() => 'recovered');
  assert.deepEqual(owner.state(), { status: 'ready', value: 'recovered' });
});

test('rerender-like scheduling preserves deadline and counts a failure once', () => {
  const retry = retrySchedule();
  assert.equal(retry.schedule(0, 'failed'), 10);
  assert.equal(retry.schedule(9, 'failed'), 10);
  assert.deepEqual(retry.snapshot(), { deadline: 10, failures: 1 });
  assert.equal(retry.takeDue(9), false);
  assert.equal(retry.takeDue(10), true);
  assert.equal(retry.takeDue(10), false);
});

test('pending does not spend failure budget; bounded failure burst backs off then retries', () => {
  const retry = retrySchedule();
  retry.schedule(0, 'pending');
  assert.deepEqual(retry.snapshot(), { deadline: 10, failures: 0 });
  assert.equal(retry.takeDue(10), true);
  retry.schedule(10, 'failed'); retry.takeDue(20);
  assert.equal(retry.schedule(20, 'failed'), 120);
  assert.deepEqual(retry.snapshot(), { deadline: 120, failures: 0 });
  assert.equal(retry.takeDue(119), false);
  assert.equal(retry.takeDue(120), true);
  assert.equal(retry.schedule(120, 'pending'), 130);
  retry.cancel();
  assert.equal(retry.takeDue(130), false);
  assert.equal(retry.schedule(130, 'failed'), null);
});
