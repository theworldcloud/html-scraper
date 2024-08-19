import { find } from "functions/find";
import { Object } from "types";


export class Element {
    public readonly html: string;

    public readonly tag: string;
    public readonly id: string | undefined;
    public readonly class: Array<string>;

    public readonly parent: string;
    public readonly children: Array<string>;

    public readonly content: string | undefined;
    public readonly attributes: Record<string, string | number | undefined>;
    public readonly data: Record<string, string | number | undefined>;

    constructor(html: string, tag: string, id: string | undefined, classes: Array<string>, parent: string, children: Array<string>, content: string, attributes: Object, data: Object) {
        this.html = html;

        this.tag = tag;
        this.id = id;
        this.class = classes;

        this.parent = parent;
        this.children = children;

        this.content = content;
        this.attributes = attributes;
        this.data = data;
    }

    // public find(selector: string) {
    //     return find(this.body, selector);
    // }
}