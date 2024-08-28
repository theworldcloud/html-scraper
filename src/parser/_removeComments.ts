import { regex } from "./regex";

type Deletion = { index: number; count: number; };

export function _removeComments(elements: Array<string>) {
    let deletions: Array<Deletion> = [];

    elements.forEach(function(element, index) {
        if (!element.includes("<!--")) return;

        let deleteNumber = 0;
        if (element.includes("-->")) {
            deleteNumber = 1;
        } else {
            for (let elementIndex = index; elementIndex < elements.length; elementIndex++) {
                const element = elements[elementIndex];
                if (element.includes("-->")) {
                    deleteNumber = elementIndex - index;
                    break;
                }
            }
        }

        deletions.push({ index: index, count: deleteNumber });
    });

    deletions = deletions.sort((a, b) => b.index - a.index);
    deletions.forEach(deletion => elements.splice(deletion.index, deletion.count));

    return elements;
}