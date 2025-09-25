# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Serbian school schedule application built with Next.js that features automatic morning/afternoon shift detection based on calendar weeks and PDF export functionality.

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
- `shiftDetection.ts` - Automatic morning/afternoon shift calculation logic
- `weekNavigation.ts` - Week-based navigation and date calculations
- `examData.ts` - Exam scheduling system
- `pdfService.tsx` - PDF generation using @react-pdf/renderer
- `schoolConfig.ts` - School-specific configuration and constants

### Key Components (`/components/`)

- `EventCard.tsx` - Individual schedule event display with Apple Calendar styling
- `EventModal.tsx` - Detailed event information popup
- `ScheduleHeader.tsx` - Week navigation controls and current week display
- `WeeklySchedulePDF.tsx` - PDF export component for weekly schedules
- `SvgIcon.tsx` - Icon system using SVG sprites from `/public/sprite.svg`

### Shift Detection System

The application automatically alternates between morning and afternoon shifts based on calendar weeks. This is a core feature that affects the entire schedule display and is handled in `shiftDetection.ts`.

### CSS Architecture

- Design tokens in `/app/styles/tokens.css` define colors, spacing, and variables (excludes typography)
- Typography rules are centralized in `/app/styles/typography.css`
- Components use CSS Modules for scoped styling
- Fonts: Merriweather (serif) and Open Sans (sans-serif) loaded from Google Fonts

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

- All UI text, days of the week, and subject names are in Serbian
- Root layout sets `lang="sr"` for proper internationalization
- Subject names and schedules are tailored to Serbian curriculum

## Data Management

### Schedule Structure

- Subjects are defined with icons, colors, and Serbian names in `scheduleData.ts`
- Time slots are mapped between different period systems in `timeMapping.ts`
- Exam data is stored in JSON files within `/data/` directory

## Testing and TypeScript

- TypeScript is configured with strict mode enabled
- Path aliases configured for `@/*` imports
- Type checking happens during build process
- No dedicated test framework is currently configured

## Key Entry Points

- `/app/layout.tsx` - Root layout with Serbian locale configuration
- `/app/schedule/page.tsx` - Main schedule interface and primary application page
- `/app/page.tsx` - Landing page (currently default Next.js template)
