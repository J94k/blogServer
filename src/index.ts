import server from './server/index.ts';
import config from './config.ts';

await server.start(config.port);
