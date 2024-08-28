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
    body: ParsedDocumentBody;
}

export interface ParsedDocumentHead {
    title: string;
    meta: Array<Record<string, string>>;
    link: Array<Record<string, string>>
}

export interface ParsedDocumentBody {
    attributes: Record<string, string>;
    elements: Array<ParsedDocumentElement>;
}

export interface ParsedDocumentElement {
    tag: string;
    attributes: Record<string, string>;
    content: string | undefined;

    parent: ParsedDocumentParentElement;
    children: Array<ParsedDocumentElement>;
}

export interface ParsedDocumentParentElement {
    tag: string;
    attributes: Record<string, string>;
    content: string | undefined;
}

export interface Properties {
    tag: string;
    id: string;
    class: Array<string>;
}