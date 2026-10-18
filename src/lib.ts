import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from './i18n';

export const slugOf = (id: string) => id.replace(/^en\//, '');

export async function allTutorials(lang: Lang = 'zh') {
  const all = await getCollection('tutorials', ({ data, id }) => {
    if (data.draft) return false;
    const loc = data.locale ?? (id.startsWith('en/') ? 'en' : 'zh');
    return loc === lang;
  });
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf() || (a.data.order ?? 0) - (b.data.order ?? 0));
}

type Tutorial = CollectionEntry<'tutorials'>;

export async function tutorialPaths(lang: Lang) {
  const all = await allTutorials(lang);
  return all.map((t, i) => {
    let prev: Tutorial | undefined = all[i + 1];
    let next: Tutorial | undefined = all[i - 1];
    let total = 0;
    if (t.data.series) {
      const s = all.filter(x => x.data.series === t.data.series).sort((a, b) => (a.data.order ?? 0) - (b.data.order ?? 0));
      const j = s.findIndex(x => x.id === t.id);
      prev = s[j - 1];
      next = s[j + 1];
      total = s.length;
    }
    const related = all.filter(x => x.id !== t.id && x.id !== prev?.id && x.id !== next?.id)
      .map(x => ({ x, n: x.data.tags.filter(g => t.data.tags.includes(g)).length }))
      .filter(r => r.n > 0).sort((a, b) => b.n - a.n).slice(0, 3).map(r => r.x);
    return { params: { id: slugOf(t.id) }, props: { t, prev, next, total, related, lang } };
  });
}
