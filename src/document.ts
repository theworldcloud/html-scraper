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

        [ this.head, this.html ] = _getTagContent(this.html, "head");
        [ this.body, this.html ] = _getTagContent(this.html, "body");
        this.html = htmlOriginal;
    }

    public find(selector: string) {
        return find(this.body, selector);
    }
}

function _getTagContent(html: string, tag: string) {
    const regex = new RegExp(`<${tag}.*?>(.*?)<\/${tag}>`, "s");
    const matchedhtml = html.match(regex)
    if (!matchedhtml) return "";

    const startIndex = html.indexOf(`<${tag}`);
    const endIndex = html.indexOf(`</${tag}>`) + 8;
    const htmltag = html.slice(startIndex, endIndex);
    html = html.replace(htmltag, "");

    return [ matchedhtml[0], html ];
}
