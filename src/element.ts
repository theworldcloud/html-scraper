import { ParsedDocumentElement } from "./types";

import { find } from "./functions/find";
import { findAll } from "./functions/findAll";

export class Element {
    public readonly tag: string;
    public readonly id: string | undefined;
    public readonly class: Array<string>;

    public readonly parent: string;
    public readonly children: Array<string>;

    public readonly content: string | undefined;
    public readonly attributes: Record<string, string | number | undefined>;
    public readonly data: Record<string, string | number | undefined>;

    private readonly elements: Array<ParsedDocumentElement>;

    constructor(tag: string, id: string | undefined, classes: Array<string>, parent: string, children: Array<string>, content: string | undefined, attributes: Record<string, string | number>, data: Record<string, string | number>, elements: Array<ParsedDocumentElement>) {
        this.tag = tag;
        this.id = id;
        this.class = classes;

        this.parent = parent;
        this.children = children;

        this.content = content;
        this.attributes = attributes;
        this.data = data;

        this.elements = elements;
    }

    public find(selector: string) {
        return find(this.elements, selector);
    }

    public findAll(selector: string) {
        return findAll(this.elements, selector);
    }
}
