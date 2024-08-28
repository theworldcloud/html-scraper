import { regex } from "./regex";

const tags: Array<string> = [ "script", "style" ];
type Deletion = { index: number; count: number; };

export function _removeTags(elements: Array<string>) {
    let deletions: Array<Deletion> = [];


    elements.forEach(function(element, openIndex) {
        tags.forEach(function(tag) {
            const isOpening = element.match(regex(`<${tag}.*>`, "g")) !== null;
            if (!isOpening) return;
            if (element.includes("</")) return;

            const isClosingTag = element.match(regex(`</${tag}.*>`, "g")) !== null;
            if (isClosingTag) return;

            const closeIndex = elements.findIndex(function(element, elementIndex) {
                const afterElement = elementIndex > openIndex;
                const isClosingTag = element.match(regex(`</${tag}.*>`, "g")) !== null;

                return afterElement && isClosingTag;
            });

            if (closeIndex === -1) return;

            const count = (closeIndex - openIndex) + 1;
            deletions.push({ index: openIndex, count: count });
        });
    });

    deletions = deletions.sort((a, b) => b.index - a.index);
    deletions.forEach(deletion => elements.splice(deletion.index, deletion.count));

    return elements;
}