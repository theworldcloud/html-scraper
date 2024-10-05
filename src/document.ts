import { Response } from "node-fetch";
import { Cookie, ParsedDocumentElement } from "./types";

import { parse } from "./parser/parser";

import { find } from "./functions/find";
import { findAll } from "./functions/findAll";

export class Document {
    public readonly cookies: Record<string, Cookie>;

    public readonly url: string | undefined;
    public readonly html: string;
    public readonly title: string;

    private readonly elements: Array<ParsedDocumentElement>;

    constructor(html: string, url: string, response: Response) {
        const cookies: Record<string, Cookie> = {};
        const responseCookies = response.headers.raw()["set-cookie"];

        if (responseCookies) {
            responseCookies.forEach(function (responseCookie) {
                const props = responseCookie.split("; ");
                const [ key, value ] = props[0].split("=");

                const cookie: Cookie = { key, value };

                const expires = props.find(prop => prop.startsWith("expires="));
                if (expires) {
                    const expire = expires.split("=")[1];
                    cookie.expires = new Date(expire).getTime() / 1000;
                }

                cookies[key] = cookie;
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


