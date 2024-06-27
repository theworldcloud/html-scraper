import { IGNORED_TAGS, Object } from "types";
import { Element } from "element";

export function find(html: string, selector: string) {
    const selectors = selector.split(">").map((selector) => selector.trim());
    selector = selectors[0].trim();
    selectors.shift();

    const indexes = selector.split("")
        .map((c, i) => c === "#" || c === "." ? i : null)
        .filter((index) => index !== null)
        .sort((a, b) => a! - b!);

    const attributes = indexes.map((index, i) => selector.slice(index as number, indexes[i + 1] ?? selector.length).trim());
    let selectorTag = selector.slice(0, indexes[0] ?? selector.length).trim();
    let selectorId = attributes.find((attr) => attr.startsWith("#"))?.slice(1);
    let selectorClasses = attributes.filter((attr) => attr.startsWith(".")).map((attr) => attr.slice(1));

    let startIndex = -1;

    const regex = new RegExp(`<${selectorTag}(.*?)>`, "g");
    const matches = html.match(regex) ?? [];
    matches.forEach(function(match) {
        const mhtml = match.replace("<", "").replace(">", "");
        const tag = mhtml.split(" ").shift() ?? "";
        const attributes = mhtml.replace(`${tag} `, "");

        if (selectorTag !== tag && selectorTag.length > 0) return;

        const id = _extractAttribute(attributes, "id");
        const classes = _extractAttribute(attributes, "class")?.split(" ") ?? [];
        if (selectorId && id !== selectorId) return;
        if (selectorClasses.length > 0 && !selectorClasses.every((c) => classes.includes(c))) return;

        startIndex = html.indexOf(match);
        if (selectorTag.length === 0) selectorTag = tag;
        if (!selectorId) selectorId = id;
        if (selectorClasses.length === 0) selectorClasses = classes;
    });
    
    if (startIndex === -1) return;
    const endIndex = _findEndingTagIndex(html, startIndex);
    const elemhtml = html.slice(startIndex, endIndex).trim();

    if (selectors.length > 0) return find(elemhtml, selectors.join(" > "));

    const children = _getChildren(elemhtml);

    const elemhtmlregex = new RegExp(`<${selectorTag} (.*?)>`, "g");
    const elemMatch = elemhtml.match(elemhtmlregex);
    if (!elemMatch) return;

    const elementTag = elemMatch[0].replace(`<${selectorTag}`, "").replace(">", "").trim();
    const elemAttributesArray = elementTag.split(" ");

    const elemAttributes: Object = {};
    const elemData: Object = {};
    elemAttributesArray.forEach(function(attribute) {
        let [ key, value ] = attribute.split("=");
        if (value) value = value.replaceAll(/"/g, "").replaceAll(/'/g, "");

        if (key.includes("data-")) {
            const dataKey = key.replace("data-", "");
            return elemData[dataKey] = parseInt(value) || value;
        }
        
        if (key === "id" || key === "class") return;
        return elemAttributes[key] = parseInt(value) || value;
    });

    const element = new Element(elemhtml, selectorTag, selectorId, selectorClasses, "", children, "", elemAttributes, elemData);
    console.log(element);
    return;
}

function _extractAttribute(html: string, attribute: string) {
    const regex = new RegExp(`${attribute}=(["|'])(.*?)(["|'])`, "g");
    const attrs = html.split(regex);

    const str = attrs.map((attr) => attr.trim()).filter(function (attr) {
        if (attr.length === 0) return false;
        if (attr.includes(`=`)) return false;
        if (attr.includes(`"`)) return false;
        // noinspection RedundantIfStatementJS
        if (attr.includes(`'`)) return false;

        return true;
    }).join(" ");

    const array = str.split(" ").filter((r) => r.length > 0);
    const result = array.join(" ").trim();

    if (result.length === 0) return undefined;
    return result;
}

function _findEndingTagIndex(html: string, startIndex: number) {
    html = html.slice(startIndex, html.length);
    let endings = 0;
    let endArrayIndex = -1;

    const lines = html.split("<").filter((line) => line.length > 0).map((line) => `<${line}`);
    if (!lines) return 0;

    lines.forEach(function(line, index) {
        if (line.includes("<!--") || line.includes("-->")) return;

        // console.log("")
        // console.log("-------")
        // console.log(line, line.length)
        // console.log("-------")
        // console.log("")

        let ignored_tag = false;
        IGNORED_TAGS.forEach(function(tag) {
            if (line.includes(`<${tag}`)) return ignored_tag = true;
        });

        if (ignored_tag) return;
        if (endArrayIndex !== -1) return;

        const end = line.match(/<\/.*?>/g) ?? undefined;
        if (end) {
            endings--;
        } else {
            endings++;
        }

        if (endings === 0 && index !== 0) return endArrayIndex = index;
    });

    const sliced = lines.slice(0, endArrayIndex + 1);
    const len = sliced.join("").length;
    return startIndex + len;
}

function _getChildren(html: string) {
    const original = html;
    const children: Array<string> = [];

    let tags = html.split(">").filter((tag) => tag.length > 0);
    tags.shift();
    const endTag = tags.pop() + ">";
    if (!endTag) return children;

    const endTagIndex = original.indexOf(endTag);

    while (html.length > 0) {

        const tag = tags[0] + ">";
        const startIndex = original.indexOf(tag);

        const endIndex = _findEndingTagIndex(original, startIndex) - 1;
        if (endIndex === -1) continue;

        const newhtml = original.slice(startIndex, endIndex);
        children.push(newhtml);
        
        html = original.slice(endIndex, endTagIndex);
        tags = html.split(">").filter((tag) => tag.length > 0);        
    }


    const htmlChildren = children.map(function(child) {
        child = child.split(">")[0];
        child = child.split("<")[1];

        const tag = child.split(" ")[0];
        child = child.replace(tag, "").trim();

        const idString = _extractAttribute(child, "id");
        const id = idString ? "#" + idString : "";

        const classesArray = _extractAttribute(child, "class")?.split(" ") ?? [];
        const classes = classesArray.length > 0 ? "." + classesArray.join(".") : "";

        return tag + id + classes;
    });

    return htmlChildren;
}
