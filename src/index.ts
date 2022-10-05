import { createServer, IncomingMessage, ServerResponse } from 'http';
import { createContainer } from './infra/connect';
// import { Knex } from 'knex';

// eslint-disable-next-line promise/catch-or-return, promise/always-return

const PORT = 3940;

const knex = createContainer().get('dev');
function handler(request: IncomingMessage, response: ServerResponse): void {
  knex('users')
    .first()
    .then(user => {
      // response.end(JSON.stringify(user));

      console.log({ user });
    });

  // console.log({ knex });
  // knex.s;
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('Hello World');
}

createServer(handler).listen(3940, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at http://localhost/${PORT}`);
});
