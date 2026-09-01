# Monthly Egress Meter and Request Pacing

Reusable guidance for a console-side egress estimate and for preventing expensive work from running merely because a page is open.

## Meter design

Treat an application egress meter as an estimate unless it is populated from an authoritative provider usage API.

Track:

- plan limit in bytes
- billing-cycle anchor date
- current cycle start/end
- starting baseline for the first partial cycle
- application-observed transferred bytes
- last refresh time
- warning thresholds
- source label: provider-reported, application-estimated, or manual baseline

Calendar-month resets should be computed from the billing anchor day, not by adding 30 days repeatedly. Adding fixed 30-day periods will drift across months.

Example:

```ts
function cycleStart(now: Date, anchorDay: number) {
  const year = now.getUTCFullYear();
  const month = now.getUTCMonth();
  const thisMonthDay = Math.min(anchorDay, new Date(Date.UTC(year, month + 1, 0)).getUTCDate());
  const candidate = new Date(Date.UTC(year, month, thisMonthDay));
  if (now >= candidate) return candidate;

  const previousLastDay = new Date(Date.UTC(year, month, 0)).getUTCDate();
  return new Date(Date.UTC(year, month - 1, Math.min(anchorDay, previousLastDay)));
}
```

If a project begins with a known provider reading in the middle of a cycle, store that value as a one-time baseline. At the next real cycle boundary, reset the baseline to zero automatically.

## Honest labels

Never present a local estimate as an exact provider invoice value. Display the source and last updated time. If an authoritative API is unavailable, provide a manual correction control without requiring routine manual updates.

## Request-on-entry policy

For usage and cost dashboards:

- request once when the authenticated console session first opens
- reuse the result across module navigation
- provide a manual Refresh action
- do not poll every 10–15 minutes unless a real operational need exists
- cache/debounce duplicate browser requests
- keep provider Admin keys server-side

For affiliate health checks:

- do not run a catalog crawl on page open
- expose an intentional manual audit action
- record the last audit time
- batch and rate-limit the work

## Media egress

For ad generation and review:

- reference provider-hosted product images where policy permits
- avoid copying search-result images into Supabase
- keep transient canvases and previews browser-local
- persist compact product/ad metadata
- send finished ads to the owner's device rather than storing/retrieving them repeatedly
- load thumbnails before full-resolution assets
