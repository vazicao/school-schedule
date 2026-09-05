# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Serbian-language school schedule application built with Next.js for a specific class (currently II·2, OŠ "Jelena Četković", Belgrade — see `schoolConfig.ts`). Its core feature is automatic morning/afternoon shift detection based on calendar weeks. It also tracks exams, teachers, textbooks, and required school supplies ("pribor") for each subject. There is no backend — all data lives in local TypeScript/JSON files. Umami Cloud analytics is wired into the deployed app.

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

### Core Services (`/lib/`)

- `scheduleData.ts` - Main schedule definitions, subjects, and time periods
- `shiftDetection.ts` - Automatic morning/afternoon shift calculation logic (alternates weekly, anchored to a reference ISO week)
- `timeMapping.ts` - Period-to-clock-time mapping for the morning and afternoon timetables
- `weekNavigation.ts` - Week-based navigation and date calculations
- `examData.ts` - Exam scheduling system, backed by `/data/exams.json` (see `data/README.md` for its structure)
- `teacherData.ts` - Teacher directory and subject/class assignments
- `textbookData.ts` - Textbook metadata (titles, authors, ISBN, cover images) per subject
- `priborData.ts` - Required/optional school supplies per subject
- `eventDetailsService.ts` - Composes schedule, exam, teacher, and textbook data into the details shown for a single schedule event
- `schoolConfig.ts` - School- and class-specific configuration and constants

### Key Components (`/components/`)

- `EventCard.tsx` - Individual schedule event display with Apple Calendar styling
- `EventModal.tsx` - Detailed event information popup (teacher, textbooks, pribor, exams)
- `ExamSummary.tsx` - Expandable summary of exams for the current week
- `ScheduleHeader.tsx` - Week navigation controls and current week display
- `SettingsDropdown.tsx` - Per-user display toggles (e.g. show/hide daycare)
- `SvgIcon.tsx` - Icon system using the SVG sprite at `/public/icons-sprite.svg`

### Shift Detection System

The application automatically alternates between morning and afternoon shifts based on calendar weeks. This is a core feature that affects the entire schedule display and is handled in `shiftDetection.ts`.

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

- All UI text, days of the week, and subject names are in Serbian, written in **Cyrillic script** (the app was fully converted from Latin to Cyrillic; keep new UI text in Cyrillic)
- Root layout sets `lang="sr"` for proper internationalization
- Subject names and schedules are tailored to the Serbian primary-school curriculum
- Exam/data source files (`data/exams.json`, `data/README.md`) use Latin script for field values — this is a data-authoring convenience, not a UI concern

## Data Management

### Schedule Structure

- Subjects are defined with icons, colors, and Serbian names in `scheduleData.ts`
- Time slots are mapped between morning/afternoon period systems in `timeMapping.ts`
- Exam data is stored in JSON files within `/data/` directory

## Testing and TypeScript

- TypeScript is configured with strict mode enabled
- Path aliases configured for `@/*` imports
- Type checking happens during build process
- No dedicated test framework is currently configured

## Key Entry Points

- `/app/layout.tsx` - Root layout with Serbian locale configuration, font loading, and Umami analytics script
- `/app/schedule/page.tsx` - Main schedule interface and primary application page
- `/app/page.tsx` - Landing page (still the default Next.js/`create-next-app` template — not yet built out)
