import { config } from './deps.ts';

const configData = await config();

const status = {
  success: 200,
  created: 201,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  internalError: 500,
  unavailable: 503,
};

export default {
  status,
  port: +configData['PORT'] ?? 8_000,
  authorsDbPath: configData['AUTHORS_DB_PATH'],
  blogDbPath: configData['BLOG_DB_PATH'],
  postsDir: configData['POSTS_DIR_PATH'],
};
