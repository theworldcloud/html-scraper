import { _getEndTagIndex } from "utils/_getEndTagIndex";
import { _extractAttribute } from "utils/_extractAttribute";

export function _getChildren(html: string) {
    const original = html;
    const children: Array<string> = [];

    let tags = html.split(">").filter((tag) => tag.length > 0).map((tag) => tag + ">");
    tags.shift();
    const endTag = tags.pop();
    if (!endTag) return children;

    const endTagIndex = original.indexOf(endTag);


    while (html.length > 0) {
        const tag = tags[0];
        const startIndex = original.indexOf(tag);

        const endIndex = _getEndTagIndex(original, startIndex) - 1;
        if (endIndex === -1) continue;

        const newhtml = original.slice(startIndex, endTagIndex);
        children.push(newhtml);

        html = original.slice(endIndex, endIndex);
        tags = html.split(">").filter((tag) => tag.length > 0);
    }

    const htmlChildren = children.map(function(child) {
        child = child.split(">")[0];
        child = child.split("<")[1];

        if (!child) return "";

        const tag = child.split(" ")[0];
        child = child.replace(tag, "").trim();

        const idString = _extractAttribute(child, "id");
        const id = idString ? "#" + idString : "";

        const classesArray = _extractAttribute(child, "class")?.split(" ") ?? [];
        const classes = classesArray.length > 0 ? "." + classesArray.join(".") : "";

        return tag + id + classes;
    }).filter(child => child.length > 0);

    return htmlChildren;
}