# Venty UI Component Mapping (Web → Flutter)

This file lists the primary UI components found in `components/`, their purpose, key CSS/visual properties, and the recommended Flutter counterpart (widget mapping) to preserve UX and UI pixel-by-pixel.

---

1. Card (Card.tsx)
- Purpose: Reusable container with consistent radius, background, border, padding, and shadows used throughout UI.
- Visual tokens: border-radius 16px, padding 16/24, border 1px rgba --shadow-card, hover translation and hover shadow.
- Flutter mapping: `VentyCard` - Container with BoxDecoration (borderRadius=16, border color = theme border, boxShadow = multiple), `GestureDetector` for onTap, `AnimatedContainer` to animate shadow and transform on press.

2. VentyButton (VentyButton.tsx)
- Purpose: Central button system with primary/secondary/outline/danger/ghost variants; responsive padding and hover/press states.
- Visual tokens: radius 12px, font-weight 700 for CTA, primary brand color, shadows for CTA, transform scale on hover.
- Flutter mapping: `VentyButton` - `ElevatedButton` for primary, `OutlinedButton` for outline, `TextButton` for ghost; custom `ButtonStyle` using `ElevatedButton.styleFrom`, add `InkWell` or `GestureDetector` for press transformations; use `MaterialStateProperty` to apply different visual states.

3. SideNav (SideNav.tsx) & MerchantSideNav
- Purpose: Left column navigation (width 240px), with logo, list of navigation links, user avatar and badges.
- Visual tokens: width 240px, item spacing p-2.5, rounded items, active states with `bg-bg-secondary`, icon glow drop-shadow when active.
- Flutter mapping: Desktop/tablet `NavigationRail` (or a fixed `Container` on left with `ListView` on large screens). Implementation with `NavRail` or `Drawer` for mobile fallback.

4. BottomNav (BottomNav.tsx) & MerchantBottomNav
- Purpose: Mobile bottom navigation with icons and translucent backdrop (`bottom-nav-glass`) and active icon glow.
- Visual tokens: active color `brand-primary`, drop-shadow on active SVG.
- Flutter mapping: `BottomNavigationBar` with `backgroundColor` slightly transparent, `selectedItemColor` set to brand primary, and custom `BottomNavigationBarItem` icons with glow effect via `BoxShadow` when selected.

5. ProductCard & ProductDetail (ProductCard.tsx, ProductDetailScreen.tsx)
- Purpose: Showcase products with images, price, title, badges, prices with `line-through`, quick actions and gallery.
- Visual tokens: image aspect ratio square, background `bg-bg-secondary`, rounded corners (rounded-xl), shadow; price big, `brand-primary` color; original price has `line-through` using `text-text-tertiary`.
- Flutter mapping: `ProductCard` uses `ClipRRect` with `BorderRadius.circular(16)` for image and `Container` for details, top `Hero` image for transition to `ProductDetailPage`. Price formatting with `NumberFormat.currency`.

6. Modal components (ShareModal, ReviewModal, Settings confirm modal)
- Purpose: Overlay modal with blurred backdrop and centered card with `rounded-xl` radius and drop-shadow.
- Visual tokens: backdrop blur, animate-fadeIn, card with `rounded-xl` and `shadow-lg`.
- Flutter mapping: `showGeneralDialog` with a `BackdropFilter` (blur) and a `ScaleTransition` + `FadeTransition` animated entry. Card uses `VentyCard` with padding 24.

7. Toast
- Purpose: Top-level message with background `bg-bg-secondary/80`, rounded corners, border and shadow. Shows for 2.7s with fade animation.
- Flutter mapping: `ScaffoldMessenger` with `SnackBar` or `OverlayEntry` to control animation and location; use `AnimatedOpacity` for show/hide.

8. Inputs & Forms
- Purpose: Standardized input fields with `rounded-lg` 8px, border color: var(--border-primary), focus: brand with box-shadow ring.
- Flutter mapping: `InputDecoration` with `OutlineInputBorder` radius 8, fillColor: theme bg, `FocusNode` to show highlighted border with brand color radius.

9. TopBar & Search bar
- Purpose: Application top bar uses `sticky` header with blurred background and `px-4 lg:px-6` padding.
- Flutter mapping: `AppBar` or custom `Container` in `PreferredSize` replicating sticky/top pinned behavior using `SliverPersistentHeader`.

10. Chat UI (UnifiedChatScreen.tsx components)
- Purpose: Chat bubbles (left/right) with `rounded-2xl` style, background `bg-brand-primary` for current user, `bg-ui-card` for others, small language flag badges, timestamps.
- Flutter mapping: `ListView` with `Align` per message, `Container` with `BorderRadius` representing bubble corner shapes, `Text` color & size mapping; `Input` bottom area with `TextField` and `VentyButton`.

11. CircularProgress (progress circles, health gauge)
- Purpose: Circular progress representation with stroke width and animated arc.
- Flutter mapping: `CustomPaint` and `AnimationController` for animated strokes or use `CircularProgressIndicator` with a custom painter.

12. Quick Actions grid (QuickActions.tsx)
- Purpose: 3 need-specific quick action CTAs displayed as grid on web.
- Flutter mapping: GridView with 3 columns and `VentyButton` variants inside; button sizes scaled to 80 for mobile squares with vertical content.

13. Toasts & CookieBanner
- Purpose: Cookie banner bottom, `Save` bar with backdrop blur and `left: 240px` on desktop (adjust with side nav width)
- Flutter mapping: Bottom overlay `Banner` widget with `BackdropFilter` blurred set to bottom and show/hide depending on conditions.

---

## Notes & Behavior
- For all interactive components, ensure that press animations on mobile are translate/scale + ripple visible similarly to the web. The `VentyButton` `ElevatedButton` uses `Material` ripple out-of-the-box. For scale, wrap with `Transform` and `GestureDetector` and use `AnimatedScale`.
- For large images and product gallery, use `Hero` transitions to preserve the same feel when moving from list -> details.
- Always use `ConstrainedBox` with `maxWidth` to keep UI centered and „desktop-like" width at larger sizes.

---

## Implementation Scorecard
Focus these tasks first (in priority):
1. Theme tokens and `ThemeData` (colors, typography, radii, shadows) – already created.
2. Core components (`Card`, `Button`) – implemented.
3. Navigation (Page routes, bottom/side navigation) – basic bottom nav implemented.
4. Dashboard – implemented as the sample page.
5. Product Detail (image gallery & CTA) – next to implement.
6. Chat components and list UI – implement subsequently.

For a full migration, follow this order to map and implement one page at a time, continuously comparing pixel values and behaviors across web and device.
