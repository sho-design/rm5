/**
 * Site search matcher, shared by the search overlay (client) and the
 * /search-index.json builder (server). No content imports here: entries
 * come in as data.
 *
 * Every word of the query must match (any order), case and accents are
 * ignored, simple plurals and endings are folded ("shots" finds "shot",
 * "injections" finds "injection"), and a word also matches the start of a
 * longer one ("physio" finds "physiotherapy"). Label hits rank above
 * keyword, kind, summary and body hits; the whole phrase scores a bonus.
 */

export interface SearchDoc {
  kind: string;
  label: string;
  sub: string;
  page: string;
  /** Extra words people use for this page (synonyms), matched like the label but ranked a little lower. */
  keys?: string;
  /** Page text as unique folded words, matched with the lowest weight. */
  words?: string;
  /** Results show one row per group; defaults to the page, so rows for the same page collapse. */
  group?: string;
  /** Rank multiplier, below 1 for answer rows (FAQ, team) so the page itself comes first on a tie. */
  weight?: number;
}

export interface SearchHit extends SearchDoc {
  score: number;
}

const STOP = new Set(
  "a an and are at be can could do does for from get go have how i if in is it me my near of on or our the there this to want we what when where which who will with you your need please".split(" "),
);

/** Lower case, accents removed, apostrophes dropped, everything else not a letter or digit becomes a space. */
export function fold(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/gi, "d")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/** Light English stemmer: enough to fold plurals and common endings. */
export function stem(word: string): string {
  let w = word;
  if (w.length <= 3) return w;
  if (w.endsWith("ies") && w.length > 4) w = w.slice(0, -3) + "y";
  else if (/(ches|shes|sses|xes)$/.test(w)) w = w.slice(0, -2);
  else if (w.endsWith("s") && !w.endsWith("ss") && !w.endsWith("us") && !w.endsWith("is")) w = w.slice(0, -1);
  if (w.endsWith("ing") && w.length > 5) w = w.slice(0, -3);
  else if (w.endsWith("ed") && w.length > 4) w = w.slice(0, -2);
  // "price" and "pricing" both fold to "pric".
  if (w.endsWith("e") && w.length > 4) w = w.slice(0, -1);
  return w;
}

const words = (s: string) => fold(s).split(" ").filter(Boolean);

/** Unique folded stems of a text, for the `words` field of an index entry. */
export function wordsOf(text: string, max = 400): string {
  const seen = new Set<string>();
  for (const w of words(text)) {
    if (w.length < 2 || STOP.has(w)) continue;
    seen.add(stem(w));
    if (seen.size >= max) break;
  }
  return [...seen].join(" ");
}

interface Prepared {
  doc: SearchDoc;
  label: string[];
  keys: string[];
  kind: string[];
  sub: string[];
  body: string[];
  labelFold: string;
  subFold: string;
  keysFold: string;
}

const stems = (s: string) => words(s).map(stem);

function prepare(doc: SearchDoc): Prepared {
  return {
    doc,
    label: stems(doc.label),
    keys: stems(doc.keys ?? ""),
    kind: stems(doc.kind),
    sub: stems(doc.sub),
    body: (doc.words ?? "").split(" ").filter(Boolean),
    labelFold: fold(doc.label),
    subFold: fold(doc.sub),
    keysFold: fold(doc.keys ?? ""),
  };
}

/** 2 for an exact word, 1 for a prefix match (query words of 4+ letters, so "fee" does not find "feel"), 0 for none. */
function hit(list: string[], q: string): number {
  let best = 0;
  for (const w of list) {
    if (w === q) return 2;
    if (q.length >= 4 && w.startsWith(q)) best = 1;
  }
  return best;
}

const WEIGHT = { label: 10, keys: 7, kind: 4, sub: 3, body: 1.5 } as const;

/** Best field match for one query word, plus a little for a second field that also matches. */
function scoreToken(p: Prepared, q: string): number {
  const s = (["label", "keys", "kind", "sub", "body"] as const)
    .map((field) => {
      const h = hit(p[field], q);
      return h ? WEIGHT[field] * (h === 2 ? 1 : 0.75) : 0;
    })
    .sort((a, b) => b - a);
  return s[0] + 0.3 * s[1];
}

const cache = new WeakMap<SearchDoc[], Prepared[]>();
const prepared = (docs: SearchDoc[]) => {
  let p = cache.get(docs);
  if (!p) {
    p = docs.map(prepare);
    cache.set(docs, p);
  }
  return p;
};

/** Query words worth matching: stop words dropped unless the query is only stop words. */
export function queryTokens(q: string): string[] {
  const all = words(q);
  const kept = all.filter((w) => !STOP.has(w));
  return (kept.length ? kept : all).map(stem);
}

/**
 * Rank `docs` for `q`. Entries must match every query word; if none do,
 * entries matching most of the words are returned instead, so a long
 * question still finds something. Each destination appears once.
 */
export function searchDocs(docs: SearchDoc[], q: string, limit = 8): SearchHit[] {
  const tokens = queryTokens(q);
  if (!tokens.length) return [];
  const phrase = fold(q);
  const scored = prepared(docs).map((p) => {
    let score = 0;
    let matched = 0;
    for (const t of tokens) {
      const s = scoreToken(p, t);
      if (s) matched++;
      score += s;
    }
    if (phrase.length >= 3) {
      if (p.labelFold === phrase) score += 20;
      else if (p.labelFold.includes(phrase)) score += 12;
      else if (p.keysFold.includes(phrase)) score += 8;
      else if (p.subFold.includes(phrase)) score += 4;
    }
    return { p, score: score * (p.doc.weight ?? 1), matched };
  });
  const need = tokens.length;
  let pool = scored.filter((s) => s.matched === need);
  if (!pool.length && need > 1) {
    const most = Math.max(...scored.map((s) => s.matched));
    if (most >= Math.ceil(need / 2)) pool = scored.filter((s) => s.matched === most);
  }
  // One row per destination: menu rows, service cards and page rows often point to the same page.
  const seen = new Set<string>();
  return pool
    .sort((a, b) => b.score - a.score)
    .filter(({ p }) => {
      const g = p.doc.group ?? p.doc.page;
      if (seen.has(g)) return false;
      seen.add(g);
      return true;
    })
    .slice(0, limit)
    .map(({ p, score }) => ({ ...p.doc, score }));
}

/** Phrases that should bring up the 911 and Health811 note above the results. */
const EMERGENCY = ["emergency", "911", "urgent", "after hours", "afterhours", "chest pain", "cant breathe", "can not breathe", "cannot breathe", "trouble breathing", "short of breath", "suicide", "suicidal", "kill myself", "overdose", "stroke", "heart attack", "bleeding", "unconscious", "seizure", "er"];

export function isEmergencyQuery(q: string): boolean {
  const f = ` ${fold(q)} `;
  return EMERGENCY.some((e) => f.includes(` ${e} `));
}
