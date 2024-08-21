import { parse } from "./parser/parser";

export class Document {
    public readonly url: string | undefined;
    // public readonly html: string;
    // public readonly head: string;
    // public readonly body: string;

    constructor(html: string, url?: string) {
        const htmlOriginal = html;
        const parsedDocument = parse(html);

        this.url = url;
        // this.html = html;

    }

    // public find(selector: string) {
    //     return find(this.body, selector);
    // }
}


