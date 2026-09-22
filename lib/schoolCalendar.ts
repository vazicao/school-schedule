// Serbia's official school calendar (raspusti and the two no-class
// holidays), published yearly by the Ministarstvo prosvete. It's the same
// for every school, so it's kept in one file per year
// (data/calendars/<year>.ts) instead of being repeated in each class's data
// — see data/README.md for how to add a new year.

export interface NonSchoolDay {
  startDate: string; // ISO date, inclusive
  endDate: string; // ISO date, inclusive (same as startDate for a single day)
  label: string; // e.g. "Zimski raspust", "Sveti Sava"
  emoji: string; // shown instead of the weekend block's generic 🎉
}

// The non-school day covering this date, if any.
export const getNonSchoolDay = (
  nonSchoolDays: NonSchoolDay[],
  date: string,
): NonSchoolDay | undefined =>
  nonSchoolDays.find((d) => date >= d.startDate && date <= d.endDate);
