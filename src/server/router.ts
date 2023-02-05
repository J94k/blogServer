import { ServerRouter } from "../deps.ts";
import blog from "../services/blog.ts";
import config from "../config.ts";

const { status } = config;
const router = new ServerRouter();

router
  .get("/postPreviews", async (ctx) => {
    const previews = await blog.getAllPostPreviews();

    ctx.response.body = JSON.stringify(Object.values(previews));
    ctx.response.status = status.success;
    ctx.response.headers.set("content-type", "application/json; charset=utf-8");
  })
  // .get("/posts", async (ctx) => {
  //   const posts = await blog.getAllPosts();

  //   ctx.response.body = JSON.stringify(posts);
  //   ctx.response.status = status.success;
  //   // ctx.response.headers.set("content-type", "application/json; charset=utf-8");
  // })
  .get("/post/:id", async (ctx) => {
    const { id } = ctx.params;
    const post = await blog.getPost(id);

    ctx.response.body = !post ? "Не найдено" : post;
    ctx.response.status = status.success;
    ctx.response.headers.set("content-type", "application/text; charset=utf-8");
  })
  .get("/authors", async (ctx) => {
    const authors = await blog.getAllAuthors();

    ctx.response.body = JSON.stringify(authors);
    ctx.response.status = status.success;
    ctx.response.headers.set("content-type", "application/json; charset=utf-8");
  })
  .get("/tags", async (ctx) => {
    const tags = await blog.getAllTags();

    ctx.response.body = JSON.stringify(tags);
    ctx.response.status = status.success;
    ctx.response.headers.set("content-type", "application/json; charset=utf-8");
  });

export default router;
