export const IGNORED_TAGS: Array<string> = [ "area", "base", "br", "col", "embed", "hr", "link", "meta", "param", "source", "track", "wbr", "\n", "\t", "\r" ];
export const INLINE_CLOSE_TAGS: Array<string> = [ "img", "input" ];
export const ENTITIES: Array<string> = [ "\n", "\t", "\r" ];
export const SYMBOLS: Record<string, string> = {
    "&nbsp;": " ",
    "&lt;": "<",
    "&gt;": ">",
    "&amp;": "&",
    "&quot;": '"',
    "&apos;": "'",
    "&cent;": "¢",
    "&pound;": "£",
    "&yen;": "¥",
    "&euro;": "€",
    "&copy;": "©",
    "&reg;": "®"
}

export type Object = Record<string, string | number | undefined>;

// export interface ScrapeElement {
//     html: string;

//     tag: string;
//     class: Array<string>;
//     id: string;

//     content: string | number;
//     children: Array<string>;
//     data: Record<string, string | number>
// }

export const regex = (str: string, flag: string) => new RegExp(str, flag);
