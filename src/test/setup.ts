import "@testing-library/jest-dom";

import { setupServer } from "msw/node";
import { beforeAll, afterEach, afterAll } from "vitest";
import handlers from "../mocks/handlers";

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

server.events.on("request:start", ({ request }) => {
  console.log("MSW intercepted:", request.method, request.url);
});
