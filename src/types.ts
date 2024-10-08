import type { RequestInit } from "node-fetch";

export interface ParsedDocument {
    html: string;
    head: ParsedDocumentHead;
    body: ParsedDocumentBody;
}

export interface ParsedDocumentHead {
    title: string;
    meta: Array<Record<string, string>>;
    link: Array<Record<string, string>>
}

export interface ParsedDocumentBody {
    attributes: Record<string, string>;
    elements: Array<ParsedDocumentElement>;
}

export interface ParsedDocumentElement {
    tag: string;
    attributes: Record<string, string>;
    content: string | undefined;

    parent: ParsedDocumentParentElement;
    children: Array<ParsedDocumentElement>;
}

export interface ParsedDocumentParentElement {
    tag: string;
    attributes: Record<string, string>;
    content: string | undefined;
}

export interface Properties {
    tag: string;
    id: string;
    class: Array<string>;
}

export interface Options extends RequestInit {
    headers?: Record<string, string>;
    cookies?: Record<string, string>;
}

export interface Cookie {
    key: string;
    value: string;
    expires?: number;
}
