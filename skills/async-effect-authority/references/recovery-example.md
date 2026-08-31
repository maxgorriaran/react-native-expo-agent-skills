# Example: reject stale work without starving current work

Use when cancellation or retry fixes stop an old result but also prevent the current request from
ever finishing. The companion script is a synthetic in-memory model, not a production adapter.

## Scenario and expected outcomes

| Event | Expected outcome |
| --- | --- |
| Request A starts; B replaces it; A settles late | A publishes nothing; B can still publish |
| A rejects after B starts | A's error must not replace B's current state |
| Owner is retired before settlement | Neither a success nor a timer may publish for that owner |
| Current request is still pending | Waiting alone does not consume a failed-attempt budget |
| Effect restarts before an existing retry deadline | Reuse that deadline; do not push it forward on every render |
| A bounded failure burst is exhausted | Back off, stop, or surface a retry action according to product policy |

In this example, exhaustion backs off and permits another attempt. That choice is appropriate only
while the owner is valid and retry remains useful; it is not a universal rule for payments, permissions,
non-idempotent mutations, or permanent errors. A request that never settles needs its own timeout or
cancellation policy. Backoff alone does not establish eventual success.

## Runnable model

With Node.js 20+ available, run from this skill directory:

```sh
node --test scripts/recovery-example.test.mjs
```

Read [the executable example](../scripts/recovery-example.test.mjs) for controlled promise settlement
and a manually advanced clock. It performs no network, native, filesystem, or real timer work.

When adapting the lesson, keep deadlines and failure counts with the actual operation owner, outside
an effect that is repeatedly recreated. Test the real publication adapter and its current-success
case; do not substitute this toy model for application regression tests.

React's [effect lifecycle documentation](https://react.dev/reference/react/useEffect) explains
setup/cleanup and development stress tests. This model tests JavaScript policy only, not React mounting,
background execution, durable transactions, exactly-once delivery, or agent instruction-following.
