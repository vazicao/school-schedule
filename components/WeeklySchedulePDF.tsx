import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { schedules, type Day } from '../lib/scheduleData';
import { type ShiftType } from '../lib/shiftDetection';
import { type WeeklyWeather } from '../lib/weatherService';
import { getCurrentSchool, getCurrentClass } from '../lib/schoolConfig';
import { format } from 'date-fns';
import { sr } from 'date-fns/locale';

// PDF styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  schoolName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#0070f3',
  },
  className: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333333',
  },
  subtitle: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  shiftInfo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0070f3',
    marginBottom: 10,
  },
  weekContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  dayColumn: {
    flex: 1,
    border: '1pt solid #e0e0e0',
    borderRadius: 4,
  },
  dayHeader: {
    backgroundColor: '#f5f5f5',
    padding: 8,
    borderBottom: '1pt solid #e0e0e0',
  },
  dayName: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  dayDate: {
    fontSize: 10,
    textAlign: 'center',
    color: '#666666',
    marginBottom: 4,
  },
  weather: {
    fontSize: 10,
    textAlign: 'center',
    color: '#666666',
  },
  eventsContainer: {
    padding: 4,
  },
  event: {
    marginBottom: 6,
    padding: 6,
    backgroundColor: '#fafafa',
    borderRadius: 2,
    borderLeft: '3pt solid',
  },
  classEvent: {
    borderLeftColor: '#0070f3',
  },
  daycareEvent: {
    borderLeftColor: '#28a745',
  },
  eventTime: {
    fontSize: 8,
    color: '#666666',
    marginBottom: 2,
    fontFamily: 'Helvetica-Bold',
  },
  eventTitle: {
    fontSize: 9,
    color: '#333333',
    lineHeight: 1.3,
  },
  eventType: {
    fontSize: 7,
    color: '#999999',
    textTransform: 'uppercase',
    marginTop: 2,
  },
  footer: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 10,
    color: '#999999',
  },
});

interface WeeklySchedulePDFProps {
  shift: ShiftType;
  week: number;
  year: number;
  weather: WeeklyWeather;
  weekDates: Date[];
}

const daycareActivities = {
  morning: [
    { time: '07:00', activity: 'Početak rada' },
    { time: '08:30-10:30', activity: 'Rad na domaćim zadacima' },
    { time: '12:00', activity: 'Ručak' },
  ],
  afternoon: [
    { time: '12:30', activity: 'Ručak' },
    { time: '13:00-14:30', activity: 'Rad na domaćim zadacima' },
  ],
};

const WeeklySchedulePDF: React.FC<WeeklySchedulePDFProps> = ({
  shift,
  week,
  year,
  weather,
  weekDates,
}) => {
  const days: Day[] = ['Ponedeljak', 'Utorak', 'Sreda', 'Четврtak', 'Petak'];
  const shiftName = shift === 'morning' ? 'Jutarnja smena' : 'Popodnevna smena';

  // Get school and class info
  const school = getCurrentSchool();
  const classInfo = getCurrentClass();

  const getEventsForDay = (day: Day, dayShift: ShiftType) => {
    const classEvents = schedules[dayShift][day].map(lesson => ({
      time: `${lesson.startTime} - ${lesson.endTime}`,
      title: lesson.subject,
      type: lesson.order,
      isClass: true,
    }));

    const daycareEvents = daycareActivities[dayShift].map(activity => ({
      time: activity.time,
      title: activity.activity,
      type: 'Produženi boravak',
      isClass: false,
    }));

    // Return events in chronological order based on shift
    if (dayShift === 'afternoon') {
      return [...daycareEvents, ...classEvents];
    } else {
      return [...classEvents, ...daycareEvents];
    }
  };

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.schoolName}>{school.name}</Text>
          <Text style={styles.className}>Razred {classInfo.name}</Text>
          <Text style={styles.title}>Raspored časova</Text>
          <Text style={styles.shiftInfo}>{shiftName}</Text>
          <Text style={styles.subtitle}>Nedelja {week}, {year}</Text>
        </View>

        <View style={styles.weekContainer}>
          {days.map((day, index) => {
            const date = weekDates[index];
            const dayWeather = weather[day];
            const events = getEventsForDay(day, shift);

            return (
              <View key={day} style={styles.dayColumn}>
                <View style={styles.dayHeader}>
                  <Text style={styles.dayName}>{day}</Text>
                  <Text style={styles.dayDate}>
                    {format(date, 'd.M.', { locale: sr })}
                  </Text>
                  {dayWeather && (
                    <Text style={styles.weather}>
                      {dayWeather.high}°/{dayWeather.low}°
                    </Text>
                  )}
                </View>

                <View style={styles.eventsContainer}>
                  {events.map((event, eventIndex) => (
                    <View
                      key={eventIndex}
                      style={[
                        styles.event,
                        event.isClass ? styles.classEvent : styles.daycareEvent,
                      ]}
                    >
                      <Text style={styles.eventTime}>{event.time}</Text>
                      <Text style={styles.eventTitle}>{event.title}</Text>
                      <Text style={styles.eventType}>{event.type}</Text>
                    </View>
                  ))}
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.footer}>
          <Text>Generisano {format(new Date(), 'dd.MM.yyyy', { locale: sr })}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default WeeklySchedulePDF;