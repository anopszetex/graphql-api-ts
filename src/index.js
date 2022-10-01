import { createServer } from 'node:http';

const PORT = 3940;

function handler(_, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World');
}

createServer(handler).listen(3940, () => {
  // eslint-disable-next-line security-node/detect-crlf, no-console
  console.log(`Server running at http://localhost/${PORT}`);
});
