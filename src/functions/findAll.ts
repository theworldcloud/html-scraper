import { ParsedDocumentElement, Properties } from "../types";
import { Element } from "../element";

import { _extractProperties } from "../utils/_extractProperties";
import { _checkManyElements } from "../utils/_checkManyElements";
import { _checkElements } from "../utils/_checkElements";

export function findAll(elements: Array<ParsedDocumentElement>, selector: string) {
    const selectors = selector.split(">").map((selector) => selector.trim());
    selector = selectors[0].trim();
    selectors.shift();

    const properties = _extractProperties(selector);

    if (selectors.length > 0) {
        let matchedElement = _checkElements(properties, elements);
        if (!matchedElement) return [];
        return findAll(matchedElement.children, selectors.join(" > "));
    }

    const matchedElements = _checkManyElements(properties, elements);
    if (matchedElements.length === 0) return [];

    const foundElements: Array<Element> = [];
    for (const matchedElement of matchedElements) {
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
        foundElements.push(element);
    }

    return foundElements;
}
