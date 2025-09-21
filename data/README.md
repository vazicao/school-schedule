# Exam Configuration

This directory contains configuration files for the school schedule app.

## Exams Configuration (`exams.json`)

The `exams.json` file contains all exam information for the academic year. This file can be easily updated as new exam dates are confirmed or changes are made to the schedule.

### Structure

```json
{
  "metadata": {
    "lastUpdated": "2025-09-20",
    "schoolYear": "2025/2026",
    "academicYear": 1
  },
  "exams": [
    {
      "weekStart": "2025-09-01",
      "weekEnd": "2025-09-05",
      "isoWeek": 36,
      "subject": "Matematika",
      "topic": "Prirodni brojevi",
      "semester": 1,
      "confirmedDate": "2025-09-03"
    }
  ]
}
```

### Fields

- **weekStart**: ISO date string for the first day of the exam week
- **weekEnd**: ISO date string for the last day of the exam week
- **isoWeek**: ISO week number (1-53)
- **subject**: Name of the subject (e.g., "Matematika", "Srpski jezik")
- **topic**: Optional exam topic or description
- **semester**: Semester number (1 or 2)
- **confirmedDate**: Optional exact date when confirmed (ISO date string or null)

### Updating Exams

1. **Adding new exams**: Add new objects to the `exams` array
2. **Confirming dates**: Update `confirmedDate` field when exact dates are known
3. **Changing topics**: Update the `topic` field as needed
4. **Metadata**: Update `lastUpdated` when making changes

### Subject Names

Use these standard subject names for consistency:
- Matematika
- Srpski jezik
- Engleski jezik
- Svet oko nas
- Likovna kultura
- Muzička kultura
- Fizičko i zdravstveno vaspitanje
- Digitalni svet
- ČOS
- Građansko vaspitanje / Verska nastava

### Example Updates

**Confirming an exact date:**
```json
{
  "weekStart": "2025-09-29",
  "weekEnd": "2025-10-03",
  "isoWeek": 40,
  "subject": "Matematika",
  "topic": "Prirodni brojevi",
  "semester": 1,
  "confirmedDate": "2025-10-01"
}
```

**Adding a second semester exam:**
```json
{
  "weekStart": "2026-02-03",
  "weekEnd": "2026-02-07",
  "isoWeek": 6,
  "subject": "Srpski jezik",
  "topic": "Glagoli",
  "semester": 2,
  "confirmedDate": null
}
```