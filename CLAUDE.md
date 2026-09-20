# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Serbian-language school schedule application built with Next.js. It supports many schools and classes: each class has its own page at `/<school>/<class>` (e.g. `/os-jelena-cetkovic/gen-2024-2`), backed by static data files under `/data` — there is no backend or database. Its core feature is automatic morning/afternoon shift detection based on calendar weeks. It also tracks exams, teachers, textbooks, and required school supplies ("pribor") for each subject. Vercel Analytics (`@vercel/analytics`) is wired into the deployed app.

The first (currently only) class is III·2 at OŠ "Jelena Ćetković", Belgrade. See `data/README.md` for how the data is organized and how to add a class or a new school year.

Note: a PDF export feature (`@react-pdf/renderer`) existed early in the project's history but was later removed in favor of the in-app schedule view. There is no `pdfService.tsx` or `WeeklySchedulePDF.tsx` anymore.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production (also runs TypeScript checking)
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checking (same as build)

## Quality Control

The project uses Husky and lint-staged for pre-commit hooks:

- ESLint automatically fixes TypeScript files
- Prettier formats all code files
- Full build test runs to ensure production compatibility
- All checks must pass before commits are allowed

## Architecture

### Routing and data flow

- `app/[school]/[class]/page.tsx` is a server component. It loads the class's data (`lib/classLoader.ts`), then renders the client component `components/SchedulePage.tsx` with it as a `data` prop. All valid `school/class` pairs are pre-rendered at build time (`generateStaticParams`, `dynamicParams = false`); anything else is a 404 (`app/not-found.tsx`).
- `/` is a landing page (`app/page.tsx`, styles in `app/home.module.css`): what the app does, a list of every class (generated from `/data` via `listClasses()` in `lib/classLoader.ts`, so adding a class adds a link), and iPhone/Android "add to home screen" steps. The old `/schedule` URL redirects to the default class (`DEFAULT_CLASS_PATH` in `next.config.ts`) so pre-restructure bookmarks/installs keep working.
- The class slug identifies a **group of kids**, not a grade (`gen-<year they started 1st grade>-<section>`), so a class's URL never changes as they move up. Each school year is a subfolder; the newest one is what the app shows.

### Data (`/data/`)

```
data/<school>/school.ts                       school info + bell schedule (period times)
data/<school>/<class>/<year>/                 e.g. os-jelena-cetkovic/gen-2024-2/2026-27/
  config.ts  schedule.ts  exams.ts  teachers.ts  textbooks.ts  pribor.ts  index.ts
```

Every year folder's `index.ts` ends with `satisfies ClassYearData`, so subject names, period labels etc. are type-checked at build time. See `data/README.md`.

### Core Services (`/lib/`)

- `subjects.ts` - Shared subject catalog (name/icon/color) and the `SubjectId` type derived from it. Every subject reference in any class's data uses `SubjectId`, so a typo or stale name is a compile error
- `schedule.ts` - Day/period types, `resolveSchedules` (fills in period times from the school's bell schedule), `getCurrentDay`
- `classData.ts` - `ClassYearData` (what a year folder exports), `ClassData` (assembled, serializable data the UI receives), `buildClassData`. Teacher contact details are stripped server-side unless the teacher opted in (`showContact`) — pages are public
- `classLoader.ts` - **Server-only** (uses `fs`): scans `/data`, picks each class's latest year folder, dynamically imports it
- `schoolConfig.ts` - School/class config types, slug conventions (regexes), `formatClassName` (roman numeral + section, e.g. "III·2")
- `shiftDetection.ts` - Morning/afternoon shift for a date, given the class's `ShiftAnchor` (a known Monday + its shift; alternates weekly, exact calendar-week math so it's correct across year boundaries)
- `timeMapping.ts` - Looks up a period's times in the bell schedule (`getClassTimes`); `getDaycareTimeRange` is kept for the disabled boravak feature
- `weekNavigation.ts` - Week-based navigation and date calculations
- `examData.ts`, `teacherData.ts`, `textbookData.ts` - Types plus pure lookup helpers that take the class's data as an argument (the data itself lives in `/data`)
- `eventDetailsService.ts` - Composes a class's schedule/exam/teacher/textbook/pribor data into the details shown for one schedule event

### Key Components (`/components/`)

- `SchedulePage.tsx` - The schedule UI (client component); takes a `ClassData` prop. Its styles are in `SchedulePage.module.css`
- `EventCard.tsx` - Individual schedule event display with Apple Calendar styling
- `EventModal.tsx` - Detailed event information popup (teacher, textbooks, pribor, exams)
- `ExamSummary.tsx` - Expandable banner listing the exams on the selected day
- `ScheduleHeader.tsx` - Week navigation controls and current week display
- `SettingsDropdown.tsx` - Per-user display toggles (currently unused; only held the disabled boravak toggle)
- `SvgIcon.tsx` - Icon system using the SVG sprite at `/public/icons-sprite.svg`

### Shift Detection System

The application automatically alternates between morning and afternoon shifts based on calendar weeks. This is a core feature that affects the entire schedule display. The alternation is anchored per class (`shiftAnchor` in the year's `config.ts`) because different classes in one school are often on opposite shifts in the same week.

### PWA (installable app)

The app can be added to a phone's home screen as "Moj Raspored".

- **Manifest** — one per class, generated at `/<school>/<class>/manifest.webmanifest` (`app/[school]/[class]/manifest.webmanifest/route.ts`) and linked from that class page's `generateMetadata`. Each class gets its own `start_url` and app `id`, so different classes install as different apps. The name/label is fixed ("Moj Raspored") so it doesn't go stale when the grade changes
- **Icons** — all generated from ONE source image, `scripts/icon-source.png`, by `npm run icons` (auto-centers the artwork; writes `public/icons/*`, `app/icon.png`, `app/apple-icon.png`, `app/favicon.ico`). To change the icon, replace that file and re-run. To compare candidates without touching anything: `npm run icons -- --sheet out.png <image> [<image> ...]`. If the icon's background color changes, update `background_color` in the manifest route
- **Service worker** — `public/sw.js`, registered in production only by `components/ServiceWorkerRegistration.tsx`. HTML pages are network-first (always the current schedule when online; the last-seen page offline or after 3s); `/_next/static` and `/icons` are cache-first; Google Fonts are stale-while-revalidate. Analytics and other sites' images are left alone. Bump `CACHE_VERSION` in it if the caching strategy itself changes
- **Status bar (iOS)** — the app uses `apple-mobile-web-app-status-bar-style: black-translucent` (`app/layout.tsx`), so the page draws under the status bar. `app/globals.css` pushes the page down by `env(safe-area-inset-top)` and paints that strip in the header color (`#d17f00`, same as the header and `themeColor`). Keep those three colors in sync
- iOS snapshots the icon and label when the app is added; after changing them, remove and re-add the home-screen icon to see the change

### CSS Architecture

- Design tokens in `/app/styles/tokens.css` define colors, spacing, and variables (excludes typography)
- Typography rules are centralized in `/app/styles/typography.css`
- Components use CSS Modules for scoped styling
- Fonts: Alegreya (serif, headings/display) and Open Sans (sans-serif, body) loaded from Google Fonts via `<link>` tags in `app/layout.tsx` (not `next/font`)

### Typography Principles

- Always use semantic HTML tags (`h1–h6`, `p`, `a`) for text
- Never put text directly inside a `div`. Inline `span` is acceptable in specific cases
- Classes are only for **variants**, not for normal text:
  - **Display classes (`.display1`, `.display2`) must ALWAYS be applied to `<h1>` tags**
  - Example: `<h1 class="display1">`, `<h1 class="display2">` (different display sizes)
  - Example: `p.paragraph-small` (smaller body variant)
  - Available classes: `.display1`, `.display2`, `.caption-small`, `.caption-large`, `.paragraph-small`
- Base styles (font family, size, line height, color, antialiasing) belong on the `body`
- **Browser defaults override inheritance**: Elements like `h1-h6`, `button`, etc. have default styles that prevent inheritance
- **Be explicit with typography**: Always declare font-size and line-height explicitly on elements and classes, even if they match body values
- **Rationale**: Explicit declarations are more predictable and maintainable than relying on inheritance
- Use color tokens only on `body` (`--color-text-primary`), other elements inherit color properly
- All line heights are defined in px for consistency
- Responsive typography: Only create responsive typography when explicitly instructed
- Do not use design tokens for typography in this project
- Keep all typography rules in `typography.css` and import that file into the global CSS file
- Button typography rules are in `buttons.css` alongside other button styles

### Serbian Localization

- All UI text, days of the week, and subject names are in Serbian, written in **Latin script** (the app was converted from Cyrillic; keep new UI text and data in Latin)
- Root layout sets `lang="sr-Latn"`, and date formatting uses date-fns's `srLatn` locale
- Subject names and schedules are tailored to the Serbian primary-school curriculum

## Data Management

- Class data lives in `/data/<school>/<class>/<year>/` (see above and `data/README.md`); shared subject display info lives in `lib/subjects.ts`
- To add a class or a new school year, add a folder — there is no registry to update
- Class schedules only say which subject is in which period; period **times** come from the school's `bellSchedule` in `data/<school>/school.ts`
- Subjects are referenced by `SubjectId` everywhere — add a new subject to `lib/subjects.ts` first

## Testing and TypeScript

- TypeScript is configured with strict mode enabled
- Path aliases configured for `@/*` imports
- Type checking happens during build process
- No dedicated test framework is currently configured

## Key Entry Points

- `/app/layout.tsx` - Root layout with Serbian locale configuration, font loading, and the Vercel `<Analytics />` component
- `/app/[school]/[class]/page.tsx` - The class schedule route (server component that loads data and renders `SchedulePage`)
- `/components/SchedulePage.tsx` - The main schedule interface
- `/app/page.tsx` - Landing page (intro, class links, install instructions)
- `/next.config.ts` - The `/schedule` redirect, and no-cache headers for the service worker
