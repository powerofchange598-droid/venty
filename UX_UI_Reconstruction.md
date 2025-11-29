# Venty Web → Flutter: UX/UI Reconstruction

This document captures the design tokens, page hierarchy, layout rules, components, and interaction patterns used in the web app (source) and maps them to equivalent Flutter widgets and theme tokens for a pixel-accurate native port.

---

## 1. Overview

- Project uses a consistent design system defined in `index.html` with CSS variables. The app supports `light`, `dark`, and `trader` themes.
- Layout uses Tailwind utility classes and a responsive grid with breakpoints at 768px (md) and 1024px (lg).
- Shadow and radii values are defined as CSS variables; buttons, cards, and dialogs share consistent elevation and radius.

---

## 2. Color Palette & Tokens

Color tokens extracted from `index.html` (RGB raw values used as CSS variables):

Light theme (default):
- --surface-0-raw: 247 247 245 -> bgPrimary: #F7F7F5
- --surface-1-raw: 255 255 255 -> bgSecondary: #FFFFFF
- --border-color-raw: 0 0 0 -> border color base: black (for rgba/border transparency)
- --shadow-color-raw: 0 0 0 -> shadow base color black
- --text-primary-raw: 17 24 39 -> textPrimary: #111827
- --text-secondary-raw: 75 85 99 -> textSecondary: #4B5563
- --brand-primary-raw: 58 123 255 -> brandPrimary: #3A7BFF

Dark theme overrides:
- bgPrimary: #0D0D10; bgSecondary: #1A1A1F
- textPrimary: #F8FAFC; textSecondary: #9CA3AF
- brandPrimary (trader/dark): #D6AF63 for `dark` (gold) and #E53935 for `trader` mode.

Feedback colors:
- Error: #DC2626; Error background: #FEE2E2
- Success: #16A34A
- Warning: #F59E0B

Shadow tokens:
- --shadow-card: 0 4px 14px rgba(..., 0.08)
- --shadow-card-hover: 0 8px 24px rgba(..., 0.1)

Button cta shadow:
- --shadow-button-cta: 0 4px 12px rgba(brand, 0.15)
- --shadow-button-cta-hover: 0 6px 16px rgba(brand, 0.2)

---

## 3. Typography System

Base font stack (see `index.html`):
- -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif
- `font-serif` is used for headings (serif style). Use `Georgia` or `Merriweather` in Flutter for the serif feel (or an included custom font if available).

Tailwind/Utility-based sizes used frequently:
- `text-xs` = 0.75rem = 12px
- `text-sm` = 0.875rem = 14px
- `text-base` = 1rem = 16px
- `text-lg` = 1.125rem = 18px
- `text-xl` = 1.25rem = 20px
- `text-2xl` = 1.5rem = 24px
- `text-3xl` = 1.875rem = 30px

Weights:
- `font-medium` = 500
- `font-semibold` = 600
- `font-bold` = 700
- For CTAs, `font-weight: 700` is used in CSS

Line-height and letter-spacing are standard default for body text; headings often use a tighter spacing.

---

## 4. Spacing System and Grid

- Tailwind spacing multiples are used (4px * n): 1 => 4px, 2 => 8px, 3=>12px, 4=>16px, 6=>24px, 8=>32px, etc.
- `PageLayout` uses `max-w-screen-xl` and content padding `px-4 md:px-6 lg:px-8` mapping to horizontal paddings: 16, 24, 32 respectively.
- Cards have `padding: 16px` on mobile, `24px` on tablet and above.

Responsive rules (breakpoints):
- Mobile (default) < 768px: 1-column layout
- MD 768 <= width < 1024: 2 columns
- LG >= 1024: 3 columns or grid with side nav

---

## 5. Components Mapping (Web → Flutter)

Note: Keep identical sizes, spacing, and colors.

- Card (.card)
  - Web: border-radius 16px, border 1px rgba(), box-shadow var(--shadow-card), padding 16 (mobile) / 24 tablet.
  - Flutter: Container with BoxDecoration, BorderRadius.circular(16), BoxShadow(s) matching CSS, and Border.all(color: ... opacity).

- VentyButton (.btn, .btn-primary, .btn-secondary, .btn-ghost)
  - Web: border radius 12px, font-weight 600, CTA with primary brand color & shadow.
  - Flutter: `ElevatedButton` for primary, `OutlinedButton` for outline, `TextButton` for ghost. Use `ElevatedButton.styleFrom` to set backgroundColor, padding, shape (12px), and shadow/elevation to match. Implement press scale and ripple using `InkWell` or `Material` states.

- SideNav
  - Web: 240px left nav on large screens; `lg:flex` and hidden on mobile.
  - Flutter: `NavigationRail` shown when width >= 1024 (desktop/tablet). For large forms, replicate the same width and content: logo header, `ListTile` items with `Icon` and `Text`, active item styles with brand color and drop shadow.

- BottomNav
  - Web: visible on mobile only using `bottom-nav-glass` styling, `drop-shadow` on active.
  - Flutter: `BottomNavigationBar` with backgroundColor `bg-bg-secondary/80`, `selectedItemColor` brandPrimary, `showUnselectedLabels` false or true as needed.

- PageLayout
  - Web: `PageLayout` uses `max-w-screen-xl mx-auto w-full px-4 md:px-6 lg:px-8` and uses `framer-motion` for transitions.
  - Flutter: `PageScaffold` using `SafeArea` + `Center` + `ConstrainedBox` (maxWidth 1440), `Padding` for horizontal margins, `AnimatedSwitcher` or `PageRouteBuilder` with custom `CurvedAnimation` (easeOutCubic) to match transitions.

- Image gallery
  - Web: aspect-square container, rounded-xl corners, overflow-hidden, hover controls with chevrons and indicators.
  - Flutter: `AspectRatio`, `ClipRRect`, `PageView` for images, overlay `IconButton` left/right with `Positioned`.

- Modals / Dialogs
  - Web: fixed inset-0 backdrop-blur with animate-fadeIn. Cards inside with `animate-cinematic-enter`. Buttons anchored in modal.
  - Flutter: `showGeneralDialog` with `BackdropFilter` blur and `CurvedAnimation` for `ScaleTransition` + `FadeTransition`.

- Toasts
  - Web: `useToast` shows a fixed bottom toast with fade-in/out.
  - Flutter: `OverlayEntry` or `ScaffoldMessenger` to show `SnackBar` with custom background color, blur, and `border-radius`.

- Icons
  - Web: `@heroicons/react` used. Map to `flutter_heroicons`, `flutter_svg`, or use Material icons that closely match. Keep sizes: 20–24px typical; corner rounding and stroke width can be preserved by using `SVG` copies if necessary.

- Inputs & forms
  - Web: background `bg-bg-primary`, border: `1px solid var(--border-primary)`, radius 8px, focus: box-shadow 0 0 0 2px rgba(brand, 0.2)
  - Flutter: `InputDecoration` with `filled: true` and `fillColor` from theme, `OutlineInputBorder` and `focusedBorder` with `borderSide` in brand color.

---

## 6. Animation & Motion

Common animations discovered in `public/animations.css`:
- fadeIn: 0.3s ease-in-out
- slideInUp: 0.4s ease-out
- cinematic-enter: 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)
- premium-pulse: periodic glow effect

Flutter mapping:
- `FadeTransition` with `AnimationController` (300ms), `Curves.easeInOut` -> fadeIn
- `SlideTransition` with `Offset(0, 0.08)` to `Offset(0, 0)` for slideInUp (duration 400ms)
- `ScaleTransition` combined with `FadeTransition` using `CurvedAnimation` with a custom curve approximation for `cinematic-enter`.
- Use `Tween` animations for interactive overscale on hover/click for buttons.

---

## 7. UX Behaviors

- Hover effects:
  - Buttons scale 1.05 on hover and shadow increases on hover. For mobile, downscale to 0.97 when pressed.
  - Cards translate up (transform translateY(-4px)) on hover.
- Loading states: use spinner `animate-spin` 24px; Flutter uses `CircularProgressIndicator` with `SizedBox` and `color` set to theme textPrimary.
- Empty states: centered text plus small guidance and a secondary CTA.
- Error states: inline text colored `feedback-error` and background `feedback-error-bg`.

---

## 8. Responsiveness Rules

- Breakpoints: 768px (md), 1024px (lg) — these determine the number of columns and whether navigation rail is used.
- The components reflow from stacked vertical on mobile to grid on tablet and with side nav on desktop.
- Visibility rules: side navigation is hidden on mobile and replaced by `BottomNav`.

---

## 9. Assets

- All merchant logos, product images, and avatars are typically remote images (picsum, unsplash, i.imgur). For a Flutter port, always reference remote images using `NetworkImage` and fallback to `AssetImage` if missing.
- The app icon (`venty-logo.svg`) is used in index.html as the favicon. Use `flutter_svg` to render `SVG` assets for crisp icons.

---

## 10. Component Inventory (Mapping)

The `components/` folder contains many reusable UI elements. Below is a prioritized mapping list for initial migration in Flutter (ordered by importance/usage):

1. `Card` -> `VentyCard` (Container + BoxDecoration)
2. `VentyButton` -> `VentyButton` (ElevatedButton/OutlinedButton)
3. `SideNav`, `BottomNav` -> `NavigationRail` + `BottomNavigationBar` logic
4. `PageLayout` -> `PageScaffold` (Constrained center wrapper)
5. `ProductCard` -> `ProductTile` (Card + Image + CTA)
6. `Modal` (ReviewModal, ShareModal) -> `showGeneralDialog` with backdrop blur
7. `TopBar` -> `AppBar` or custom header
8. `Chat` components -> `ListView` + bubble styles (rounded-2xl; chat bubble left/right with color backgrounds)
9. `Toast` -> `Overlay` / `ScaffoldMessenger` (Snackbar style)
10. `ThemeToggle` -> `Switch` with `onChanged` toggling `ThemeMode` and setting a persisted setting in `SharedPreferences` or similar.

Each component should implement consistent shadows, border radius, paddings, and colors from the theme tokens.

---

## 11. Flutter Folder Structure (Suggested)

lib/
  main.dart (entry + theme provider + route handler)
  src/
    theme/
      colors.dart
      theme.dart
      typography.dart
      shadows.dart
    components/
      venty_card.dart
      venty_button.dart
      page_scaffold.dart
      venty_navbar.dart
      venty_sidenav.dart
      topbar.dart
      venty_toast.dart
      icons/ (svg wrappers)
    pages/
      dashboard_page.dart
      market_page.dart
      product_detail_page.dart
      onboarding_pages/*
      store_builder/*
    models/*
    services/*

assets/
  svgs/
  images/

---

## 12. Pixel-Accurate Rules & Implementation Notes

- Use exact color values from CSS variables; compute rgba alpha for tints and translucent overlays.
- Use `BorderRadius.circular(16)` for card corner radii and `12` for button rounding.
- Use multi-stop `BoxShadow` where needed to match depth (`shadow-card-hover` uses two stacked shadows in dark theme).
- Font mapping must prefer system fonts (Roboto/Segoe UI) for body and `Georgia` or similar for serif headings.
- Placeholders and loaders should use the same sizes. For example, the spinner's size in web is 20–24px; replicate with `SizedBox` and `CircularProgressIndicator`.
- Animations: match durations and easing. Use `CurvedAnimation` and `Scale/Slide/Fade` transitions.

---

## 13. Next Steps / Implementation Plan

1. Implement the theme tokens in a Flutter `theme.dart` (colors and typography) — done in `flutter_app/lib/src/theme`.
2. Create base components (`VentyCard`, `VentyButton`) — done in `flutter_app/lib/src/components`.
3. Map crucial pages (`Dashboard`, `Marketplace`, `ProductDetail`) — example `Dashboard` implemented.
4. Implement navigation (`NavigationRail` for tablet/desktop and `BottomNavigationBar` for mobile).
5. Implement each component in the inventory, with pixel-perfect CSS translation into Flutter styles.
6. Add unit & widget tests for visual consistency (optionally using `golden` tests).

---

## 14. Assets & Accessibility

- Use `Semantics` wrappers for buttons and images to replicate `aria` tags in web and ensure accessibility.
- Respect color contrast for text and interactive elements as per the web design.

---

## 15. Implementation Notes for Specific Edge Cases

- `Trader` theme uses a red brand color — expose preferences toggle to switch between themes.
- Some web components rely on `localStorage`— in Flutter map to `SharedPreferences` for persistence.
- `Framer-motion` animations: map to `AnimatedSwitcher` or `PageRouteBuilder` transitions.

---

End of reconstruction document. This file will be the source of truth for the Flutter port. For full pixel-accurate replication across all screens, continue implementing and validating components one-by-one, using the mapping here as reference.
