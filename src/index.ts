import { createServer, IncomingMessage, ServerResponse } from 'http';

const PORT = 3940;

function handler(request: IncomingMessage, response: ServerResponse): void {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('Hello World');
}

createServer(handler).listen(3940, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at http://localhost/${PORT}`);
});
