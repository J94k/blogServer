import db from '../db/db.ts';

const getAllPosts = async (): Promise<Record<string, unknown>> => {
  const data = await db.authors.get('*');
  let allPosts: Record<string, unknown> = {};

  Object.values(data).forEach(({ posts }) => {
    allPosts = { ...allPosts, ...posts };
  });

  return allPosts;
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
  getAllPosts,
  getAllAuthors,
  getAllTags,
};
