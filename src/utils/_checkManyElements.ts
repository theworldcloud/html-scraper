import { ParsedDocumentElement, Properties } from "../types";
import { _doesElementMatchProperties } from "./_doesElementMatchProperties";

export function _checkManyElements(properties: Properties, elements: Array<ParsedDocumentElement>) {
    const matchedElements: Array<ParsedDocumentElement> = [];

    for (const element of elements) {
        if (_doesElementMatchProperties(properties, element)) {
            matchedElements.push(element);
            continue;
        }


        if (element.children.length == 0) continue;

        const childrenMatchedElements = _checkManyElements(properties, element.children);
        if (childrenMatchedElements.length === 0) continue;

        matchedElements.push(...childrenMatchedElements)
    }

    return matchedElements;
}