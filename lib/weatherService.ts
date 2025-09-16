export type WeatherData = {
  icon: string;
  high: number;
  low: number;
  description: string;
};

export type WeeklyWeather = {
  [day: string]: WeatherData;
};

const OPENWEATHER_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BELGRADE_COORDS = { lat: 44.8176, lon: 20.4633 };

// Weather icon mapping from OpenWeatherMap codes to emojis
const weatherIconMap: Record<string, string> = {
  '01d': '☀️', // clear sky day
  '01n': '🌙', // clear sky night
  '02d': '⛅', // few clouds day
  '02n': '☁️', // few clouds night
  '03d': '☁️', // scattered clouds
  '03n': '☁️',
  '04d': '☁️', // broken clouds
  '04n': '☁️',
  '09d': '🌧️', // shower rain
  '09n': '🌧️',
  '10d': '🌦️', // rain day
  '10n': '🌧️', // rain night
  '11d': '⛈️', // thunderstorm
  '11n': '⛈️',
  '13d': '🌨️', // snow
  '13n': '🌨️',
  '50d': '🌫️', // mist
  '50n': '🌫️',
};

// Fallback weather data if API fails
const fallbackWeather: WeatherData = {
  icon: '☀️',
  high: 20,
  low: 10,
  description: 'Sunny',
};

export async function getCurrentWeather(): Promise<WeatherData> {
  if (!OPENWEATHER_API_KEY) {
    console.warn('OpenWeather API key not found, using fallback weather');
    return fallbackWeather;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${BELGRADE_COORDS.lat}&lon=${BELGRADE_COORDS.lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data = await response.json();

    return {
      icon: weatherIconMap[data.weather[0].icon] || '☀️',
      high: Math.round(data.main.temp_max),
      low: Math.round(data.main.temp_min),
      description: data.weather[0].description,
    };
  } catch (error) {
    console.error('Failed to fetch weather:', error);
    return fallbackWeather;
  }
}

export async function getWeeklyWeather(): Promise<WeeklyWeather> {
  if (!OPENWEATHER_API_KEY) {
    console.warn('OpenWeather API key not found, using fallback weather');
    return {
      'Ponedeljak': fallbackWeather,
      'Utorak': fallbackWeather,
      'Sreda': fallbackWeather,
      'Četvrtak': fallbackWeather,
      'Petak': fallbackWeather,
    };
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${BELGRADE_COORDS.lat}&lon=${BELGRADE_COORDS.lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data = await response.json();

    // Group forecast data by day
    const weeklyData: WeeklyWeather = {};
    const dayNames = ['Nedelja', 'Ponedeljak', 'Utorak', 'Sreda', 'Četvrtak', 'Petak', 'Subota'];

    data.list.forEach((forecast: any) => {
      const date = new Date(forecast.dt * 1000);
      const dayName = dayNames[date.getDay()];

      // Only process weekdays (Ponedeljak through Petak)
      if (['Ponedeljak', 'Utorak', 'Sreda', 'Četvrtak', 'Petak'].includes(dayName)) {
        if (!weeklyData[dayName]) {
          weeklyData[dayName] = {
            icon: weatherIconMap[forecast.weather[0].icon] || '☀️',
            high: Math.round(forecast.main.temp_max),
            low: Math.round(forecast.main.temp_min),
            description: forecast.weather[0].description,
          };
        } else {
          // Update high/low if this forecast has more extreme temperatures
          weeklyData[dayName].high = Math.max(weeklyData[dayName].high, Math.round(forecast.main.temp_max));
          weeklyData[dayName].low = Math.min(weeklyData[dayName].low, Math.round(forecast.main.temp_min));
        }
      }
    });

    // Fill in any missing days with fallback
    ['Ponedeljak', 'Utorak', 'Sreda', 'Četvrtak', 'Petak'].forEach(day => {
      if (!weeklyData[day]) {
        weeklyData[day] = fallbackWeather;
      }
    });

    return weeklyData;
  } catch (error) {
    console.error('Failed to fetch weekly weather:', error);
    return {
      'Ponedeljak': fallbackWeather,
      'Utorak': fallbackWeather,
      'Sreda': fallbackWeather,
      'Četvrtak': fallbackWeather,
      'Petak': fallbackWeather,
    };
  }
}