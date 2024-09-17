import { ParsedDocumentElement, Properties } from "../types";
import { _doesElementMatchProperties } from "./_doesElementMatchProperties";

export function _checkElements(properties: Properties, elements: Array<ParsedDocumentElement>): ParsedDocumentElement | undefined {
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