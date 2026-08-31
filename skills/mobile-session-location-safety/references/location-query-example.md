# Example: moving fixes repeatedly invalidate a useful query

Use when nearby results remain loading because every sensor update replaces in-flight work, or when
results never recover after location becomes available. Do not use this example to define GPS accuracy,
permission policy, background tracking, or geographic routing thresholds.

## Separate the identities

- Session identity answers which owner may use the result.
- Location evidence answers whether the available fix is permitted, fresh, and accurate enough.
- Query identity answers whether the request's meaningful inputs have changed.
- Refresh identity distinguishes a deliberate new request for the same query.

The synthetic example uses caller-supplied region keys such as `area-a`; it does not derive keys from
real coordinates. Reuse a request only when the provider contract permits it and all meaningful inputs
(filters, locale, account scope, and other relevant options) are represented. Quantization must not
hide a materially changed destination, privacy boundary, or stale fix.

| Event | Expected outcome |
| --- | --- |
| No usable location, then usable location | Begin the query on the transition to usable evidence |
| Several usable fixes, same owner and meaningful query | Keep useful in-flight work; do not restart merely for sensor noise |
| Query A replaced by B | A's late success or error does not replace B |
| Permission/evidence becomes unusable while A is pending | Invalidate A and expose an unavailable state |
| Explicit refresh or new session with the same region key | Create a new request identity |
| Current request fails, then retry is requested | Current error is visible and a new attempt can succeed |

## Runnable model

With Node.js 20+ available, run from this skill directory:

```sh
node --test scripts/query-example.test.mjs
```

[The executable model](../scripts/query-example.test.mjs) uses manually resolved promises, abstract
keys, and an in-memory result sink. It makes no provider requests and does not use location APIs.
It assumes its caller has already decided whether location is usable; revalidate that truth before
publishing in the real application. It intentionally omits cache expiry, request timeouts, and retries
without an explicit caller action. Add those policies only when required by the target app.

Passing this model proves the example's request logic, not actual GPS, background recovery, provider
correctness, or an installed agent's behavior. Test the application's actual caller and commit sink too.
