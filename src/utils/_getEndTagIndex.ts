import {IGNORED_TAGS, INLINE_CLOSE_TAGS, regex} from "types";

export function _getEndTagIndex(html: string, startIndex: number) {
    html = html.slice(startIndex, html.length);
    let endings = 0;
    let endArrayIndex = -1;

    // const lines = html.split("<").filter((line) => line.length > 0).map((line) => `<${line}`);'
    const lines = html.match(regex(`<(.*?)>`, "g")) ?? [];
    if (!lines) return 0;

    lines.forEach(function(line, index) {
        if (line.includes("<!--") || line.includes("-->")) return;

        let ignored_tag = false;
        IGNORED_TAGS.forEach(function(tag) {
            if (line.includes(`<${tag}`)) return ignored_tag = true;
        });

        let inline_close_tag = false;
        INLINE_CLOSE_TAGS.forEach(function(tag) {
            if (line.includes(`<${tag}`)) return inline_close_tag = true;
        });

        if (endArrayIndex !== -1) return;
        if (ignored_tag) return;
        if (inline_close_tag) return endArrayIndex = index;

        const end = line.match(/<\/.*?>/g) ?? undefined;
        if (end) {
            endings--;
        } else {
            endings++;
        }

        if (endings === 0 && index !== 0) return endArrayIndex = index;
    });

    const sliced = lines.slice(0, endArrayIndex + 1);
    const [ openingTag, closingTag ] = [ sliced[0], sliced[sliced.length - 1] ];

    const innerHtml = html.match(regex(`${openingTag}(.*?)${closingTag}`, "g")) ?? [];
    if (!innerHtml) return;
    if (!innerHtml[0]) return;

    const len = innerHtml[0].length;
    return startIndex + len;
}