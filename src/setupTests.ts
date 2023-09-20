import '@testing-library/jest-dom';
import { setupServer } from 'msw/node';
import { handlers } from './mocks/handlers.tsx'

const server = setupServer(...handlers);

// Establish a connection to the server before running tests.
beforeAll(() => {
  server.listen();
});

// Reset any handlers that are declared as a part of your tests.
afterEach(() => {
  server.resetHandlers();
});

// Clean up the server connection after all tests are done.
afterAll(() => {
  server.close();
});