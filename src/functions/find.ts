import { ParsedDocumentElement, Properties } from "../types";
import { _extractProperties } from "./_extractProperties";
import {Element} from "../element";

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

    const content = matchedElement.content;

    const element = new Element(tag, id, classes, parent, children, content, matchedElement.attributes, matchedElement.data, matchedElement.children);
    console.log(element)
}

function _checkElements(properties: Properties, elements: Array<ParsedDocumentElement>): ParsedDocumentElement | undefined {
    let matchedElement: ParsedDocumentElement | undefined = undefined;

    for (const element of elements) {
        if (_doesElementMatchProperties(properties, element)) {
            matchedElement = element;
            break;
        }

        if (element.children.length == 0) continue;
        matchedElement = _checkElements(properties, element.children);
        if (matchedElement) break;
    }

    return matchedElement;
}

function _doesElementMatchProperties(properties: Properties, element: ParsedDocumentElement): boolean {
    const tagMatching = (properties.tag.length > 0 && element.tag == properties.tag) || properties.tag.length == 0;
    const idMatching = (properties.id.length > 0 && element.attributes.id == properties.id) || properties.id.length == 0;

    const elementClasses = (element.attributes.class ?? "").split(" ").filter((name: string) => name.length > 0);
    let classMatching = true;
    properties.class.forEach((className) => {
        if (!elementClasses.includes(className)) {
            classMatching = false;
        }
    });

    classMatching = classMatching || properties.class.length == 0;

    return tagMatching && idMatching && classMatching;
}