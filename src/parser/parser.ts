import { _removeTags } from "./_removeTags";
import { parseHead } from "./parseHead";
import { parseBody } from "./parseBody";
import { ParsedDocument, ParsedDocumentHead, ParsedDocumentBody } from "types";
import { _removeComments } from "./_removeComments";

const entities: Array<string> = [ "\n", "\t", "\r" ];

export function parse(html: string) {
    entities.forEach((entity) => html = html.replaceAll(entity, ""));
    let tags = html.split(/(<[^>]+>)/).filter((element) => element.trim().length > 0);
    tags = _removeComments(tags);
    tags = _removeTags(tags);

    const newhtml = tags.join("");
    const head = parseHead(tags);
    const body = parseBody(tags);

    const emptyParsedHead: ParsedDocumentHead = { title: "", meta: [], link: [] };
    const emptyParsedBody: ParsedDocumentBody = { attributes: {}, elements: [] };

    const document: ParsedDocument = {
        html: newhtml,
        head: head || emptyParsedHead,
        body: body || emptyParsedBody
    };

    return document;
}