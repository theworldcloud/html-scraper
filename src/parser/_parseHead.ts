import {regex} from "./regex";

export function _parseHead(tags: Array<string>) {
    const headOpenTag = tags.find(tag => tag.match(regex("<head.*>", "g")) !== null);
    const headCloseTag = tags.find(tag => tag.match(regex("</head.*>", "g")) !== null);
    if (!headOpenTag || !headCloseTag) return;

    const startIndex = tags.indexOf(headOpenTag);
    const endIndex = tags.indexOf(headCloseTag);

    const headTags = tags.slice(startIndex + 1, endIndex);
    const [ title, titleStartIndex, titleEndIndex ] = _getDocumentTitle(headTags);
    headTags.splice(titleStartIndex, titleEndIndex - titleStartIndex + 1);

    _getMetaTags(headTags);
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

function _getMetaTags(tags: Array<string>) {
    const metaTags: Array<Record<string, string>> = [];
    console.log(tags);

    // const elements = tags.filter(tag => tag.match(regex("<meta.*>", "g")) !== null);
    // elements.forEach(function(element) {
    //     const metaTag: Record<string, string> = {};
    //     const attributes = element.match(regex("([a-z-]+)=\"([^\"]+)\"", "g"));
    //     if (!attributes) return;
    //
    //     attributes.forEach(function(attribute) {
    //         const [ key, value ] = attribute.split("=");
    //         metaTag[key] = value;
    //     });
    //
    //     console.log(metaTag);
    // });


    // return metaTags;
}