import { Response } from "node-fetch";
import { ParsedDocumentElement } from "./types";

import { parse } from "./parser/parser";

import { find } from "./functions/find";
import { findAll } from "./functions/findAll";

export class Document {
    public readonly cookies: Record<string, string>;

    public readonly url: string | undefined;
    public readonly html: string;
    public readonly title: string;

    private readonly elements: Array<ParsedDocumentElement>;

    constructor(html: string, url: string, response: Response) {
        const cookies: Record<string, string> = {};
        const responseCookies = response.headers.get("set-cookie");
        if (responseCookies) {
            const cookieStrings = responseCookies.split(";");
            cookieStrings.forEach(function(cookie) {
                cookie = cookie.trim();
                const [ key, value ] = cookie.split("=");
                if (key === "path" || key === "secure" || key === "HttpOnly" || key === "SameSite") return;
                cookies[key] = value;
            });
        }

        this.cookies = cookies;

        const parsedDocument = parse(html);

        this.url = url;
        this.html = parsedDocument.html;
        this.title = parsedDocument.head.title;

        this.elements = parsedDocument.body.elements;
    }

    public find(selector: string) {
        return find(this.elements, selector);
    }

    public findAll(selector: string) {
        return findAll(this.elements, selector);
    }
}


