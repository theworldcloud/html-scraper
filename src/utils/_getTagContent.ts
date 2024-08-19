import { regex, SYMBOLS, ENTITIES } from "../types";
import { _getEndTagIndex } from "./_getEndTagIndex";

export function _getTagContent(html: string) {
    const htmlTags: Array<string> = html.match(regex(`<(.*?)>`, "g")) ?? [];
    const tags = htmlTags.filter((htmlTag) => !htmlTag.includes("</"));
    tags.push(htmlTags[htmlTags.length - 1]);

    tags.forEach(function(tag, index) {
        if (index == 0 || index == (tags.length - 1)) {
            html = html.replace(tag, "");
            return;
        }

        const startIndex = html.indexOf(tag);
        const endIndex = _getEndTagIndex(html, startIndex);
        const replaceTag = html.slice(startIndex, endIndex);
        html = html.replace(replaceTag, "");
    });

    Object.keys(SYMBOLS).forEach((symbol) => html = html.replaceAll(symbol, SYMBOLS[symbol]));
    ENTITIES.forEach((entity) => html = html.replaceAll(entity, ""));
    const content = html.trim();
    return content;
}