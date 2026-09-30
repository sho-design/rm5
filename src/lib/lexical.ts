import type { NoteBlock } from "@/content/types";

type LexicalNode = { type: string; text?: string; tag?: string; children?: LexicalNode[] };
type LexicalDoc = { root?: { children?: LexicalNode[] } };

function textOf(node: LexicalNode): string {
  if (node.type === "text") return node.text ?? "";
  if (node.type === "linebreak") return " ";
  return (node.children ?? []).map(textOf).join("");
}

/**
 * Flatten a Lexical document into the article blocks the note template
 * renders: headings and paragraphs. Lists become one paragraph per item.
 */
export function lexicalToBlocks(doc: unknown): NoteBlock[] {
  const root = (doc as LexicalDoc | null)?.root;
  if (!root?.children) return [];
  const out: NoteBlock[] = [];
  for (const node of root.children) {
    if (node.type === "heading") out.push({ type: "h", text: textOf(node).trim() });
    else if (node.type === "list") for (const li of node.children ?? []) out.push({ type: "p", text: textOf(li).trim() });
    else if (node.type === "paragraph" || node.type === "quote") {
      const t = textOf(node).trim();
      if (t) out.push({ type: "p", text: t });
    }
  }
  return out;
}

/** Build a Lexical document from article blocks (used by the seed). */
export function blocksToLexical(blocks: NoteBlock[]) {
  const text = (t: string) => ({ type: "text", text: t, version: 1, format: 0, detail: 0, mode: "normal", style: "" });
  const base = { version: 1, format: "", indent: 0, direction: "ltr" as const };
  return {
    root: {
      type: "root",
      ...base,
      children: blocks.map((b) =>
        b.type === "h" ? { type: "heading", tag: "h2", ...base, children: [text(b.text)] } : { type: "paragraph", textFormat: 0, textStyle: "", ...base, children: [text(b.text)] },
      ),
    },
  };
}
