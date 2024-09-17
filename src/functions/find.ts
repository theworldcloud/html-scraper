import { ParsedDocumentElement, Properties } from "../types";
import { Element } from "../element";

import { _extractProperties } from "../utils/_extractProperties";
import { _checkElements } from "../utils/_checkElements";

export function find(elements: Array<ParsedDocumentElement>, selector: string) {
    const selectors = selector.split(">").map((selector) => selector.trim());
    selector = selectors[0].trim();
    selectors.shift();

    const properties = _extractProperties(selector);

    const matchedElement = _checkElements(properties, elements);
    if (!matchedElement) return undefined;

    if (selectors.length > 0) return find(matchedElement.children, selectors.join(" > "));

    const tag = matchedElement.tag;
    const id = (matchedElement.attributes.id ?? "");
    const classes = (matchedElement.attributes.class ?? "").split(" ").filter((name: string) => name.length > 0);

    const parentTag = matchedElement.parent.tag;
    const parentId = (matchedElement.parent.attributes.id ?? "").length > 0 ? `#${matchedElement.parent.attributes.id}` : "";
    const parentClasses = (matchedElement.parent.attributes.class ?? "").split(" ").filter((name: string) => name.length > 0);
    const parentClass = parentClasses.length > 0 ? `.${parentClasses.join(".")}` : "";
    const parent = `${parentTag}${parentId}${parentClass}`;

    const children = matchedElement.children.map(function(childElement) {
        const childTag = childElement.tag;
        const childId = (childElement.attributes.id ?? "").length > 0 ? `#${childElement.attributes.id}` : "";
        const childClasses = (childElement.attributes.class ?? "").split(" ").filter((name: string) => name.length > 0);
        const childClass = childClasses.length > 0 ? `.${childClasses.join(".")}` : "";
        const child = `${childTag}${childId}${childClass}`;

        return child;
    });

    const attributes: Record<string, string | number> = {};
    const data: Record<string, string | number> = {};

    Object.keys(matchedElement.attributes).forEach(function(key) {
        if (key === "id" || key === "class") return;

        const isAttributeData = key.startsWith("data-");
        const isValueNumber = !isNaN(Number(matchedElement.attributes[key]));

        const modifiedKey = isAttributeData ? key.replace("data-", "") : key;
        const value = isValueNumber ? Number(matchedElement.attributes[key]) : matchedElement.attributes[key];

        if (isAttributeData) return data[modifiedKey] = value;
        return attributes[modifiedKey] = value;
    });

    const content = matchedElement.content;
    const element = new Element(tag, id, classes, parent, children, content, attributes, data, matchedElement.children);
    return element;
}

