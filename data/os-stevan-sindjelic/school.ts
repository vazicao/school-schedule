import type { SchoolConfig } from "../../lib/schoolConfig";

// Basic info from the planplus.rs Belgrade school directory (Zvezdara listing,
// Milića Rakića street page). Several other Serbian schools share this name
// (Vojska, Kamenica, Veliki Popovac...) — these details are the Belgrade one's.
// No official website was found (the obvious *.edu.rs names don't resolve).
// Times: the school's "Satnica" (sent by a parent) — periods 1-5 per shift,
// with a long break after 2. čas.
const school: SchoolConfig = {
  slug: "os-stevan-sindjelic",
  name: "OŠ Stevan Sinđelić",
  shortName: "Stevan Sinđelić",
  fullName: 'Osnovna škola "Stevan Sinđelić"',
  address: "Milića Rakića 1, 11050 Beograd",
  municipality: "Zvezdara",
  neighborhood: "Konjarnik",
  phone: "011 347 4075",
  // Period times per shift — shared by every class in the school.
  bellSchedule: {
    morning: [
      { order: "1. čas", startTime: "08:00", endTime: "08:45" },
      { order: "2. čas", startTime: "08:50", endTime: "09:35" },
      { order: "3. čas", startTime: "10:00", endTime: "10:45" },
      { order: "4. čas", startTime: "10:50", endTime: "11:35" },
      { order: "5. čas", startTime: "11:40", endTime: "12:25" },
    ],
    afternoon: [
      { order: "1. čas", startTime: "12:45", endTime: "13:30" },
      { order: "2. čas", startTime: "13:35", endTime: "14:20" },
      { order: "3. čas", startTime: "14:40", endTime: "15:25" },
      { order: "4. čas", startTime: "15:30", endTime: "16:15" },
      { order: "5. čas", startTime: "16:20", endTime: "17:05" },
    ],
  },
};

export default school;
