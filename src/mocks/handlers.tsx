import { rest } from 'msw';
import temp from './temp.json'

const metApiCall: string =
   'https://api.met.no/weatherapi/locationforecast/2.0/compact';

export const handlers = [

  rest.get(metApiCall, (req, res, ctx) => {
    console.log('Mocking api call');
    const lat = req.url.searchParams.get('lat');
    const lon = req.url.searchParams.get('lon');
    const altitude = req.url.searchParams.get('altitude');
    console.log('Still mocking api call');
    if (lat === '63.4036' && lon === '13.0590' && altitude === '389') {
      // Respond with mock data for the specific query parameters
      return res(
        ctx.status(200),
        ctx.json({ /* Your mock response data here */ })
      );
    } else {
      // Respond with a different mock response or error message
      return res(
        ctx.status(404),
        ctx.json({ message: 'Not found' })
      );
    }
  })
]