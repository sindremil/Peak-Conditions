import { HttpResponse, http } from "msw";
import mockData from "./mockData.json";

const handlers = [
  http.get(
    "https://api.met.no/weatherapi/locationforecast/2.0/compact",
    ({ request }) => {
      const url = new URL(request.url);
      url.searchParams.set("lat", "63.4036");
      url.searchParams.set("lon", "13.0590");
      url.searchParams.set("altitude", "389");
      return HttpResponse.json(mockData);
    },
  ),
];

export default handlers;
