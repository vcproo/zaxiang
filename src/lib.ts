import { getCollection } from 'astro:content';
export async function allTutorials() {
  return (await getCollection('tutorials', ({ data }) => !data.draft))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf() || (a.data.order ?? 0) - (b.data.order ?? 0));
}
