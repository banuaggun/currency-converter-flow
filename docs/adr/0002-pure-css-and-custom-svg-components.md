# 2. Zero-Dependency Styling with Pure CSS & Custom SVG Components

## Date

2026-11-16

## Status

Accepted

## Context

Financial dashboards require crisp visual hierarchy, responsive data grids, and smooth interactive feedback (such as trend indicators, charts, and state messages). Using third-party UI libraries (e.g., Tailwind CSS, Material UI, or external icon packs) would introduce unnecessary bundle overhead, restrict fine-grained control over layout alignment, and create visual inconsistency across different browsers.

## Decision

We decided to build the entire user interface using **Pure CSS (Custom Properties, Flexbox, Grid, Keyframes)** alongside a custom, in-house **SVG Icon & Chart System** (`BaseChart`, `TrendUpIcon`, `TrendDownIcon`, `InfoIcon`, `WarningIcon`).

The key motivations behind this decision are:

1. **Zero UI Bundle Overhead:** Eliminating external styling and icon dependencies keeps the production bundle lightweight and fast to load.
2. **Consistent Cross-Platform Rendering:** Replacing browser-dependent system emojis (e.g., `▲`, `▼`, `ℹ️`) with standardized `viewBox` SVG components guarantees identical visual sharpness on all devices and high-DPI screens.
3. **Full Layout Control:** Utilizing native CSS variables and custom media queries allows precise responsive behavior across desktop monitors and mobile viewports without fighting framework overrides.

## Consequences

- All visual tokens (colors, spacing, borders, and transitions) are centrally managed via CSS Custom Properties (`index.css`).
- UI components remain completely decoupled from third-party styling libraries, making long-term maintenance and visual refinements straightforward.
- Custom SVG charts and icons scale seamlessly without pixelation while inheriting dynamic theme colors via `currentColor`.
