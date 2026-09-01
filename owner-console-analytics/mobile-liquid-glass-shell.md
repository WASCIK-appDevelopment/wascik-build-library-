# Mobile Liquid-Glass Console Shell

Reusable guidance for a private, iPhone-first console with one shared navigation shell and stable slide-out detail panels.

## Shared shell rule

Every authenticated console route should render through one shell component. The shell owns:

- authentication/session verification
- title and module description
- sign-out
- usage/status gauges
- Home and module navigation
- the current-route indicator
- the shared liquid-glass menu drawer
- the page-content boundary

Feature pages should provide only their module content. A route that bypasses the shell will eventually lose navigation, access behavior, spacing, or responsive fixes.

## Drawer behavior

Use a side drawer on larger screens and a bottom sheet on narrow screens. Preserve:

- a real backdrop button
- Escape-to-close
- initial focus and focus restoration
- body-scroll locking while open
- an accessible dialog name
- a large close target
- framework-native navigation links
- reduced-motion support

Do not place irreversible actions directly on a crowded card. Open a focused drawer, show the record and consequences, then require confirmation.

## Prevent horizontal drift on iPhone

A vertically scrolling drawer can still move sideways when a long field, URL, message, grid child, or textarea establishes a wider intrinsic width. Lock the drawer and all immediate content to the viewport:

```css
.detail-drawer,
.detail-drawer__body,
.detail-drawer__body > * {
  min-width: 0;
  max-width: 100%;
  box-sizing: border-box;
}

.detail-drawer__body {
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior-x: none;
  touch-action: pan-y;
  -webkit-overflow-scrolling: touch;
}

.detail-drawer__body input,
.detail-drawer__body textarea,
.detail-drawer__body select {
  width: 100%;
  min-width: 0;
  max-width: 100%;
  box-sizing: border-box;
}

.detail-drawer__body p,
.detail-drawer__body strong,
.detail-drawer__body span,
.detail-drawer__body label {
  overflow-wrap: anywhere;
  word-break: break-word;
}
```

Also apply `min-width: 0` to nested grid/flex children, conversations, record panels, and action groups. Allow textarea resizing vertically only.

## Daily command-center pattern

The console landing page should show the owner what requires attention without forcing them through every module:

- new/repeated leads
- overdue and upcoming follow-ups
- approval queues
- usage/quota warnings
- module health
- direct links to the relevant workspaces

Keep live data snapshots deterministic during server rendering. Avoid displaying time-sensitive “now” values that differ between server and browser hydration unless they are deliberately client-rendered.

## Reuse boundary

Keep colors, module names, logos, and business-specific routes configurable. The shell and drawer behavior should remain customer-neutral.


## Transparency and blur balance

A panel is not visually “liquid glass” merely because it uses `backdrop-filter`. If the panel fill or page backdrop is too opaque, the underlying interface disappears and the result reads as a solid blue card.

Use three coordinated layers:

1. a light page backdrop that dims without hiding the page
2. a translucent panel tint, generally well below full opacity
3. blur, saturation, an inset edge highlight, and a subtle reflection layer

Always judge the effect over real page content. The site’s shapes and colors should remain recognizable behind the panel, but softened enough that menu text stays readable. Provide an opaque fallback only for browsers that do not support backdrop filtering.
