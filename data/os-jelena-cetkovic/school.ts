import type { SchoolConfig } from "../../lib/schoolConfig";

const school: SchoolConfig = {
  slug: "os-jelena-cetkovic",
  name: "OŠ Jelena Ćetković",
  shortName: "Jelena Ćetković",
  fullName: 'Osnovna škola "Jelena Ćetković"',
  address: "Beograd, Srbija",
  // Period times per shift — shared by every class in the school.
  bellSchedule: {
    morning: [
      { order: "1. čas", startTime: "08:00", endTime: "08:45" },
      { order: "2. čas", startTime: "08:50", endTime: "09:35" },
      { order: "3. čas", startTime: "09:55", endTime: "10:40" },
      { order: "4. čas", startTime: "10:45", endTime: "11:30" },
      { order: "5. čas", startTime: "11:35", endTime: "12:20" },
      { order: "6. čas", startTime: "12:25", endTime: "13:10" },
    ],
    afternoon: [
      { order: "Pretčas", startTime: "13:10", endTime: "13:55" },
      { order: "1. čas", startTime: "14:00", endTime: "14:45" },
      { order: "2. čas", startTime: "14:50", endTime: "15:35" },
      { order: "3. čas", startTime: "15:55", endTime: "16:40" },
      { order: "4. čas", startTime: "16:45", endTime: "17:30" },
      { order: "5. čas", startTime: "17:35", endTime: "18:20" },
      { order: "6. čas", startTime: "18:25", endTime: "19:10" },
    ],
  },
};

export default school;
