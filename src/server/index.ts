import { SERVER_PORT } from './config';
import { app } from './app';

console.log('SERVER_PORT: ', SERVER_PORT);

app.listen(SERVER_PORT, () => console.log(`Express app listening on port ${SERVER_PORT}!`));
