import {IGNORED_TAGS, regex} from "../types";
import {_extractAttribute} from "./_extractAttribute";

export function _getParentTag(html: string, elementTag: string, elementTagIndex: number) {
    const lines = html.split("<").filter((line) => line.length > 0).map((line) => `<${line}`);
    // console.log(lines);
    if (!lines) return;

    let openings = 0;
    let parentIndex = -1;
    let parentTags: Record<number, number> = {};

    lines.forEach(function(line, lineIndex) {
        if (line.includes("<!--") || line.includes("-->")) return;

        let ignored_tag = false;
        IGNORED_TAGS.forEach(function(tag) {
            if (line.includes(`<${tag}`)) return ignored_tag = true;
        });

        if (ignored_tag) return;
        if (parentIndex !== -1) return;

        const tag = line.match(/<.*?>/g) ?? undefined;
        if (!tag) return;

        const tagString = tag[0];

        if (elementTag === tagString) {
            parentIndex = parentTags[lineIndex - 1];
        }

        if (tagString.includes("</")) {
            openings--;
        } else {
            openings++;
        }

        parentTags[lineIndex] = html.indexOf(tagString);
    });

    const endIndex = html.indexOf(">", parentIndex);
    const tagHtml = html.slice(parentIndex, endIndex + 1)
            .replace("<", "").replace(">", "").trim();

    const tagHtmls = tagHtml.split(" ");
    const tag = tagHtmls[0];
    tagHtmls.shift();

    const idString = _extractAttribute(tagHtmls.join(" "), "id");
    const id = idString ? "#" + idString : "";

    const classesArray = _extractAttribute(tagHtmls.join(" "), "class")?.split(" ") ?? [];
    const classes = classesArray.length > 0 ? "." + classesArray.join(".") : "";

    return tag + id + classes;
}