import { _getTagHtml } from "utils/_getTagHtml";
import { find } from "functions/find";

export class Document {
    public readonly url: string | undefined;
    public readonly html: string;
    public readonly head: string;
    public readonly body: string;

    constructor(html: string, url?: string) {
        const htmlOriginal = html;

        this.url = url;
        this.html = html;

        [ this.head, this.html ] = _getTagHtml(this.html, "head");
        [ this.body, this.html ] = _getTagHtml(this.html, "body");
        this.html = htmlOriginal;
    }

    public find(selector: string) {
        return find(this.body, selector);
    }
}


