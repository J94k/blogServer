import db from '../db/db.ts';

const getAllPostPreviews = async (): Promise<Record<string, unknown>> => {
  const data = await db.authors.get('*');
  let allPostPreviews: Record<string, unknown> = {};

  Object.values(data).forEach(({ postPreviews }) => {
    allPostPreviews = { ...allPostPreviews, ...postPreviews };
  });

  return allPostPreviews;
};

const getAllPosts = async (): Promise<Record<string, unknown>> => {
  const data = await db.authors.get('*');
  let allPosts: Record<string, unknown> = {};

  Object.values(data).forEach(({ posts }) => {
    allPosts = { ...allPosts, ...posts };
  });

  return allPosts;
};

const getPost = async (id: string): Promise<string> => {
  return await db.authors.getPost(id);
};

const getAllAuthors = async (): Promise<Record<string, unknown>[]> => {
  const data = await db.authors.get('*');
  const authors: Record<string, unknown>[] = [];

  Object.keys(data).forEach((nickname) => {
    authors.push({
      nickname,
      story: data[nickname].story,
    });
  });

  return authors;
};

const getAllTags = async (): Promise<string[]> => {
  const tags = await db.blog.get('tags');

  return tags;
};

export default {
  getAllPostPreviews,
  getAllPosts,
  getPost,
  getAllAuthors,
  getAllTags,
};
