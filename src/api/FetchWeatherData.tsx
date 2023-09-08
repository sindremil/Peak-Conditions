// api.js (You can name it as per your preference)
import { useQuery } from '@tanstack/react-query';

const fetchWeatherData = async () => {
  const response = await fetch(
    'https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=63.4327&lon=13.0923&altitude=1420',
    {
      headers: {
        'User-Agent': 'PeakConditions (Studentprosjekt ved NTNU i emne IT2810) jesperrg@stud.ntnu.no',
        // Add any other headers if required
      },
    }
  );

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};

export const useWeatherData = () => {
  return useQuery(['weatherData'], fetchWeatherData);
};
