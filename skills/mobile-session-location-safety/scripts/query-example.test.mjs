// Synthetic model only. Caller owns permission, accuracy, freshness and query-key policy.
// No real location, provider, caching expiry, timeout or automatic retry behavior is modeled.
import assert from 'node:assert/strict';
import test from 'node:test';

function deferred() {
  let resolve, reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}

function queryModel() {
  let generation = 0;
  let identity;
  let pending;
  let state = { status: 'unavailable' };
  return {
    state: () => state,
    observe({ owner, key, usable, refresh = false }, load) {
      if (!usable || !owner || !key) {
        generation += 1;
        identity = undefined;
        pending = undefined;
        state = { status: 'unavailable' };
        return Promise.resolve();
      }
      const same = identity?.owner === owner && identity?.key === key;
      if (same && !refresh && state.status === 'pending') return pending;
      // Reuse ready data only within this illustrative scenario; production needs freshness policy.
      if (same && !refresh && state.status === 'ready') return Promise.resolve();
      identity = { owner, key };
      const captured = ++generation;
      state = { status: 'pending' };
      pending = (async () => {
        try {
          const value = await load();
          if (captured === generation) state = { status: 'ready', value };
        } catch (error) {
          if (captured === generation) state = { status: 'error', error };
        }
      })();
      return pending;
    },
  };
}

const observation = { owner: 'session-a', key: 'area-a:filter-a', usable: true };

test('missing evidence makes no request; usable evidence later recovers', async () => {
  const query = queryModel();
  await query.observe({ ...observation, usable: false }, () => assert.fail('no evidence'));
  assert.deepEqual(query.state(), { status: 'unavailable' });
  await query.observe(observation, () => 'nearby');
  assert.deepEqual(query.state(), { status: 'ready', value: 'nearby' });
});

test('same meaningful query reuses pending work despite observation noise', async () => {
  const query = queryModel(), work = deferred();
  let calls = 0;
  const first = query.observe(observation, () => { calls += 1; return work.promise; });
  const second = query.observe({ ...observation }, () => assert.fail('duplicate request'));
  assert.equal(first, second);
  await Promise.resolve();
  assert.equal(calls, 1);
  work.resolve('nearby'); await first;
  await query.observe(observation, () => assert.fail('unexpected ready-data refresh'));
  assert.deepEqual(query.state(), { status: 'ready', value: 'nearby' });
});

test('query replacement suppresses both late success and late error', async () => {
  for (const outcome of ['resolve', 'reject']) {
    const query = queryModel(), old = deferred();
    const first = query.observe(observation, () => old.promise);
    await query.observe({ ...observation, key: 'area-b:filter-a' }, () => 'new');
    old[outcome](outcome === 'resolve' ? 'old' : new Error('old'));
    await first;
    assert.deepEqual(query.state(), { status: 'ready', value: 'new' });
  }
});

test('permission or evidence loss clears visible data and invalidates pending work', async () => {
  const query = queryModel(), old = deferred();
  await query.observe(observation, () => 'ready');
  await query.observe({ ...observation, usable: false }, () => assert.fail('not usable'));
  assert.deepEqual(query.state(), { status: 'unavailable' });
  const first = query.observe(observation, () => old.promise);
  await query.observe({ ...observation, usable: false }, () => assert.fail('not usable'));
  old.resolve('late'); await first;
  assert.deepEqual(query.state(), { status: 'unavailable' });
});

test('explicit refresh or new owner invalidates same-key pending work', async () => {
  for (const replacement of [{ refresh: true }, { owner: 'session-b' }]) {
    const query = queryModel(), old = deferred();
    const first = query.observe(observation, () => old.promise);
    await query.observe({ ...observation, ...replacement }, () => 'current');
    old.resolve('old'); await first;
    assert.deepEqual(query.state(), { status: 'ready', value: 'current' });
  }
});

test('current failure is visible; caller can explicitly retry the same query', async () => {
  const query = queryModel(), error = new Error('current');
  await query.observe(observation, () => { throw error; });
  assert.deepEqual(query.state(), { status: 'error', error });
  await query.observe(observation, () => 'recovered');
  assert.deepEqual(query.state(), { status: 'ready', value: 'recovered' });
});
