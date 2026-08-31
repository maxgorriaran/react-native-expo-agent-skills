# Example: automatic camera recovery overrides a user's overview

Use when several sources can request a camera move or change navigation chrome. Keep app navigation
and geographic camera policy separate; use only the portions relevant to the requested bug.

## Camera scenario

A user taps “Overview” while an older foreground-recovery lookup is pending. The lookup later
settles and recenters on the user, undoing the explicit action.

| Event | Owner action | Expected check |
| --- | --- | --- |
| Recovery starts | Capture session, destination, and camera-intent generation | Work is bound to the captured identities |
| User requests overview | Advance camera intent and request overview through the camera owner | The prior recovery no longer owns camera publication |
| Old recovery settles | Recheck its captured identities at the camera sink | It cannot recenter the newer overview |
| User explicitly resumes follow mode | Establish a new follow intent | Current tracking can update the camera again |

The priority and duration of overview mode are product decisions. Do not permanently disable
automatic recovery, assume a universal priority ranking, or add a second camera controller.
Test current follow-mode success as well as suppression of the old recovery.

## Mounted inactive tab scenario

Tab A opens a detail that hides its tab chrome. The user then selects tab B while A remains mounted.
Store visibility under route identity and derive the active route's options. A delayed effect or cleanup
from A must not hide or restore B's chrome. Returning to A should reflect A's current route state.

Test A hidden, B selected, A late cleanup, and return to A. Include duplicate presses and normal
back/dismissal behavior when those paths participate in the bug. Do not “fix” visibility by forcing
every tab to unmount and discarding its state.

## Evidence boundary

An event trace and focused owner tests can establish transition policy. Actual camera animation,
gesture interruption, layout, and platform back behavior require the corresponding runtime checks.
No map provider or live location data is required for the synthetic event table.

React Navigation's [navigation lifecycle](https://reactnavigation.org/docs/navigation-lifecycle/)
describes screens remaining mounted. The identity and camera-priority approach here is illustrative
application policy, not a framework-provided guarantee.
