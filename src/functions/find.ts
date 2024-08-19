import {ENTITIES, Object, regex} from "types";
import { Element } from "element";

import { _extractTag } from "utils/_extractTag";
import { _getEndTagIndex } from "utils/_getEndTagIndex";
import { _getChildren } from "utils/_getChildren";
import { _getParentTag } from "../utils/_getParentTag";
import { _getTagContent } from "../utils/_getTagContent";

export function find(html: string, selector: string, parentHtml?: string): Element | undefined {
    const selectors = selector.split(">").map((selector) => selector.trim());
    selector = selectors[0].trim();
    selectors.shift();

    const indexes = selector.split("")
        .map((c, i) => c === "#" || c === "." ? i : null)
        .filter((index) => index !== null)
        .sort((a, b) => a! - b!);

    const selectorAttributes = indexes.map((index, i) => selector.slice(index as number, indexes[i + 1] ?? selector.length).trim());
    let selectorTag = selector.slice(0, indexes[0] ?? selector.length).trim();
    let selectorId = selectorAttributes.find((attr) => attr.startsWith("#"))?.slice(1);
    let selectorClasses = selectorAttributes.filter((attr) => attr.startsWith(".")).map((attr) => attr.slice(1));
    let startIndex = -1;

    parentHtml = parentHtml ?? html;
    [ startIndex, selectorTag, selectorId, selectorClasses ] = _extractTag(html, selectorTag, selectorId, selectorClasses);
    if (startIndex === -1) return;

    const endIndex = _getEndTagIndex(html, startIndex);
    let elementHtml = html.slice(startIndex, endIndex).trim();
    if (selectors.length > 0) return find(elementHtml, selectors.join(" > "), html);

    const children = _getChildren(elementHtml);
    const elementHtmlTag = elementHtml.match(regex(`<${selectorTag} (.*?)>`, "g"));
    if (!elementHtmlTag) return;

    const elementHtmlTagAttributes = elementHtmlTag[0].replace(`<${selectorTag}`, "")
        .replace(">", "").trim()
        .match(regex(`(.*?)=(["|'])(.*?)(["|'])`, "g")) ?? [];

    const data: Object = {};
    const attributes: Object = {};
    elementHtmlTagAttributes.forEach(function(attribute) {
        attribute = attribute.trim();

        let key = attribute.match(regex(`(.*?)=`, "g"))![0] ?? undefined;
        if (key === undefined) return

        let value = attribute.match(regex(`(["|'])(.*?)(["|'])`, "g"))![0] ?? undefined;
        if (value === undefined) return;

        key = key.slice(0, key.length - 1);
        value = value.slice(1, value.length - 1);

        if (key.includes("data-")) {
            const dataKey = key.replace("data-", "");
            return data[dataKey] = parseInt(value) || value;
        }

        if (key === "id" || key === "class") return;
        return attributes[key] = parseInt(value) || value;
    });

    const parent = _getParentTag(parentHtml, elementHtmlTag[0], startIndex);
    if (!parent) return;

    const content = _getTagContent(elementHtml);
    ENTITIES.forEach((entity) => elementHtml = elementHtml.replaceAll(entity, ""));
    const element = new Element(elementHtml, selectorTag, selectorId, selectorClasses, parent, children, content, attributes, data);
    return element
}

