// export const IGNORED_TAGS: Array<string> = [ "area", "base", "br", "col", "embed", "hr", "link", "meta", "param", "source", "track", "wbr", "\n", "\t", "\r" ];
// export const INLINE_CLOSE_TAGS: Array<string> = [ "img", "input" ];
// export const SYMBOLS: Record<string, string> = {
//     "&nbsp;": " ",
//     "&lt;": "<",
//     "&gt;": ">",
//     "&amp;": "&",
//     "&quot;": '"',
//     "&apos;": "'",
//     "&cent;": "¢",
//     "&pound;": "£",
//     "&yen;": "¥",
//     "&euro;": "€",
//     "&copy;": "©",
//     "&reg;": "®"
// }

export interface ParsedDocument {
    html: string;
    head: ParsedDocumentHead;
}

export interface ParsedDocumentHead {
    title: string;
    meta: Array<Record<string, string | number>>;
    link: Array<Record<string, string>>
}