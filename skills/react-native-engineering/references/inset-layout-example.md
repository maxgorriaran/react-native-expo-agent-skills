# Example: bottom controls are obscured or padded twice

Use for a screen with a bottom tab bar, scroll content, and a keyboard-sensitive action. This is a
layout investigation, not a recommendation to migrate navigators or install a new inset library.

## Request

“The save button is too high on one platform and covered by the keyboard on another. Fix the layout
without disabling large text or replacing navigation.”

## Establish who already handles the space

Inspect the actual navigator, screen wrapper, scroll view, action container, and keyboard handling.
Record whether each obstruction reduces the available viewport, overlays content, or is already
included in another measurement. Native and JavaScript tab implementations may use different contracts.

| Synthetic measurement | Consequence to check |
| --- | --- |
| Navigator already reduces the viewport by 70 units | Adding the same 70 to the screen again double-counts that space |
| Tab overlays content; measured height is 70 including a 24-unit bottom inset | Do not blindly add another 24; verify what the measured height includes |
| Keyboard handler already resizes the content region | Adding full keyboard height again may overcorrect |
| Text wraps and the action becomes taller | Use measured/intrinsic layout or scrolling; do not preserve a fixed short-text height |

These numbers illustrate accounting, not platform constants or a universal padding formula.
Avoid simply deleting all bottom padding: foreground controls can need clearance even when a
background is intentionally allowed to extend beneath a translucent bar.

## Acceptance scenarios

- Compact viewport, normal text: the final item and save action remain reachable.
- Compact viewport, large text: wrapping does not clip the action; scrolling reaches it.
- Keyboard open: focus and the action remain reachable without an unexplained second gap.
- Keyboard closed and tab restored: clearance returns to the correct layout.
- Repeat on each affected platform or native/JavaScript implementation; record anything not exercised.

Keep before/after measurements and interaction evidence. A screenshot cannot prove keyboard
transitions, scrolling, focus order, or accessibility semantics by itself.

## Primary documentation

Consult the installed navigator's [safe-area guidance](https://reactnavigation.org/docs/handling-safe-area/)
and React Native's [KeyboardAvoidingView reference](https://reactnative.dev/docs/keyboardavoidingview).
The accounting method above is an illustrative engineering approach, not a guarantee about every navigator.
