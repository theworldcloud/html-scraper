import { ParsedDocumentHead } from "types";
import { regex } from "./regex";

export function parseHead(tags: Array<string>) {
    const headOpenTag = tags.find(tag => tag.match(regex("<head.*>", "g")) !== null);
    const headCloseTag = tags.find(tag => tag.match(regex("</head.*>", "g")) !== null);
    if (!headOpenTag || !headCloseTag) return;

    const startIndex = tags.indexOf(headOpenTag);
    const endIndex = tags.indexOf(headCloseTag);

    const headTags = tags.slice(startIndex + 1, endIndex);
    const [ title, titleStartIndex, titleEndIndex ] = _getDocumentTitle(headTags);
    headTags.splice(titleStartIndex, titleEndIndex - titleStartIndex + 1);


    const metaTags = _getTags("meta", headTags);
    const linkTags = _getTags("link", headTags);

    const head: ParsedDocumentHead = {
        title: title,
        meta: metaTags,
        link: linkTags
    }

    return head;
}

function _getDocumentTitle(tags: Array<string>): [ string, number, number ] {
    const openTag = tags.find(tag => tag.match(regex("<title.*>", "g")) !== null);
    const closeTag = tags.find(tag => tag.match(regex("</title.*>", "g")) !== null);
    if (!openTag || !closeTag) return [ "", 0, 0 ];

    const startIndex = tags.indexOf(openTag);
    const endIndex = tags.indexOf(closeTag);

    const contents = tags.slice(startIndex + 1, endIndex);
    const content = contents.join(" ");

    return [ content, startIndex, endIndex];
}

function _getTags(type: string, tags: Array<string>) {
    const _tags: Array<Record<string, string>> = [];

    const elements = tags.filter(tag => tag.match(regex(`<${type}.*>`, "g")) !== null);
    elements.forEach(function(element) {
        element = element.replace(`<${type} `, "");
        const _tag: Record<string, string> = {};

        let attributes = element.match(regex(`(.*?)=(["|'])(.*?)(["|'])`, "g"));
        if (!attributes) return;


        attributes.forEach(function(attribute) {
            attribute = attribute.trim();

            const key = attribute.split("=")[0];
            const values = attribute.match(regex(`(?<=["|'])(.*?)(?=["|'])`, "g"));
            if (!values) return;

            const value = values[0];
            _tag[key] = value;
        });

        _tags.push(_tag);
    });

    return _tags;
}