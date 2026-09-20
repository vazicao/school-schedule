# Class data

Everything a class page shows lives here, as plain TypeScript files. There is no database and no registry: **adding a folder adds a page.**

```
data/
  <school>/
    school.ts                       school name + bell schedule (period times)
    <class>/
      <year>/
        config.ts  schedule.ts  exams.ts  teachers.ts  textbooks.ts  pribor.ts
        index.ts                    assembles the six files above
```

Example: `data/os-jelena-cetkovic/gen-2024-2/2026-27/` is served at `/os-jelena-cetkovic/gen-2024-2`.

## Slugs

| Level  | Convention                                                 | Example              |
| ------ | ---------------------------------------------------------- | -------------------- |
| School | lowercase ASCII kebab-case (`č/ć→c`, `š→s`, `ž→z`, `đ→dj`) | `os-jelena-cetkovic` |
| Class  | `gen-<year the group started 1st grade>-<section>`         | `gen-2024-2`         |
| Year   | `<start year>-<2-digit end year>`                          | `2026-27`            |

The class slug identifies the **group of kids**, not the grade, so the link parents get **never changes** as the class moves up. The grade lives in each year's `config.ts` instead.

The **newest year folder wins** (they sort alphabetically). Publishing next year's data means adding its folder — the same URL then shows it. Old year folders can stay; they're just not shown.

## Adding a new school year for an existing class (each September)

1. Copy last year's folder to the new year, e.g. `2026-27` → `2027-28`.
2. `config.ts`: update `schoolYear`, `grade` (+1), `schoolYearStart`, `homeroomTeacherId`, and `shiftAnchor` (a Monday of the new year whose shift you know — shifts alternate weekly from it).
3. Replace `schedule.ts`, `exams.ts`, `teachers.ts`, `textbooks.ts`, `pribor.ts` with the new year's content.
4. Run `npm run build`. Deploying is the switch — it's what makes the new year go live.

## Adding a new class or school

- New class in an existing school: add `data/<school>/<class>/<year>/` as above.
- New school: also add `data/<school>/school.ts` (copy an existing one and change the name + `bellSchedule`).

Nothing else needs editing. The build fails with a clear error if anything doesn't line up.

## What each file holds

- **`school.ts`** — names and the `bellSchedule`: when each period starts and ends, per shift. Defined once per school, shared by all its classes.
- **`config.ts`** — `grade`, `section`, `schoolYear`, `schoolYearStart` ("previous week" navigation stops at the week containing this date), `shiftAnchor`, `homeroomTeacherId`. The display name ("III·2") is derived from grade + section.
- **`schedule.ts`** — for each shift and weekday: which subject is in which period. Only `order` and `subject` — times come from the bell schedule.
- **`exams.ts`** — exact dates. `type` is `"Kontrolni zadatak"` or `"Pismena vežba"`.
- **`teachers.ts`** — the teachers, plus `subjectTeachers` for subjects _not_ taught by the homeroom teacher. **Contact details (email, phone, room) are only shown if `showContact: true`** — these pages are public, so each teacher has to opt in, and the details are stripped on the server otherwise.
- **`textbooks.ts`** — per subject. `isbn` and `imageUrl` are optional (some items genuinely have none).
- **`pribor.ts`** — supplies to bring, per subject.

## Type checking

Every subject name is a `SubjectId` (defined in `lib/subjects.ts`), and every period label is a `PeriodOrder`. A typo or a stale name is a **build error**, not a silent missing icon. If a class needs a subject that doesn't exist yet, add it to `lib/subjects.ts` first.

Note: some old textbook data (e.g. 2nd grade's "Svet oko nas") isn't carried over — it's in git history.
