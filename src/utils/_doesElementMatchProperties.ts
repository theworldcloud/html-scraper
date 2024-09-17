import { ParsedDocumentElement, Properties } from "../types";

export function _doesElementMatchProperties(properties: Properties, element: ParsedDocumentElement): boolean {
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