import { Server } from '../deps.ts';
import router from './router.ts';

const server = new Server();

server.use((ctx, next) => {
  ctx.response.headers.set('Access-Control-Allow-Origin', '*');
  return next();
});
server.use(router.routes());
server.use(router.allowedMethods());

const start = (port: number): void => {
  server.listen({
    port,
  });
};

export default {
  start,
};
