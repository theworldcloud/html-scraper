import { regex } from "./regex";
import {ParsedDocumentBody, ParsedDocumentElement, ParsedDocumentParentElement} from "../types";
import {P} from "vitest/dist/reporters-yx5ZTtEV";

export function parseBody(tags: Array<string>) {
    const bodyOpenTag = tags.find(tag => tag.match(regex("<body.*>", "g")) !== null);
    const bodyCloseTag = tags.find(tag => tag.match(regex("</body.*>", "g")) !== null);
    if (!bodyOpenTag || !bodyCloseTag) return;

    const startIndex = tags.indexOf(bodyOpenTag);
    const endIndex = tags.indexOf(bodyCloseTag);

    const bodyTag = tags[startIndex];
    const bodyTags = tags.slice(startIndex + 1, endIndex);

    const attributes = _extractAttributes(bodyTag);
    const bodyElement = _parse(bodyTags);

    const parsedBody: ParsedDocumentBody = {
        attributes: attributes,
        elements: bodyElement.children
    }

    return parsedBody;
}

function _parse(elements: Array<string>) {
    const objectIndexs: Array<number> = [];
    const bodyElement: ParsedDocumentElement = { tag: "body", attributes: {}, content: undefined, parent: { tag: "html", content: undefined, attributes: {} }, children: [] };
    let oldParsedElement: ParsedDocumentElement = bodyElement;

    for (let element of elements) {
        let parsedElement: ParsedDocumentElement = { tag: "", attributes: {}, content: undefined, parent: { tag: "", content: undefined, attributes: {} }, children: [] };

        const inlineCloseTag = element.match(regex("<.*?/>", "g"));
        const closeTag = element.match(regex("</.*?>", "g"));
        const openTag = element.match(regex("<.*?>", "g"));

        if (!inlineCloseTag && !closeTag && !openTag) {
            parsedElement = oldParsedElement;
            parsedElement.content = element.trim();
            continue;
        }

        if (inlineCloseTag) {
            const tag = inlineCloseTag[0].split(" ")[0]
                .replace("<", "").replace(">", "");

            const attributes = _extractAttributes(inlineCloseTag[0]);
            const parentElement: ParsedDocumentParentElement = {
                tag: oldParsedElement.tag,
                attributes: oldParsedElement.attributes,
                content: oldParsedElement.content,
            };

            parsedElement.tag = tag;
            parsedElement.attributes = attributes;
            parsedElement.parent = parentElement;

            oldParsedElement.children.push(parsedElement);
            continue;
        }

        if (closeTag) {
            objectIndexs.pop();

            let parentObject = bodyElement;
            objectIndexs.forEach(function(index) {
                parentObject = parentObject.children[index];
            });

            oldParsedElement = parentObject;
            continue;
        }

        if (openTag) {
            const tag = openTag[0].split(" ")[0]
                .replace("<", "").replace(">", "");

            const attributes = _extractAttributes(openTag[0]);
            const parentElement: ParsedDocumentParentElement = {
                tag: oldParsedElement.tag,
                attributes: oldParsedElement.attributes,
                content: oldParsedElement.content,
            };

            parsedElement.tag = tag;
            parsedElement.attributes = attributes;
            parsedElement.parent = parentElement;

            oldParsedElement.children.push(parsedElement);

            const index = oldParsedElement.children.indexOf(parsedElement);
            objectIndexs.push(index);

            oldParsedElement = parsedElement;
            continue;
        }
    }

    return bodyElement;
}

function _extractAttributes(html: string) {
    const attributes: Record<string, string | number> = {};
    const elements = html.match(regex(`(.*?)=(["|'])(.*?)(["|'])`, "g")) ?? [];

    elements.forEach(function(element) {
        const tag = element.split(" ")[0].trim();
        element = element.replace(tag, "");
        element = element.trim();

        const key = element.split("=")[0];
        const values = element.match(regex(`(?<=["|'])(.*?)(?=["|'])`, "g"));
        if (!values) return;

        const value = values[0];
        attributes[key] = value;
    });

    return attributes;
}