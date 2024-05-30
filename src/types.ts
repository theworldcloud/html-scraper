export interface ScrapeElement {
    html: string;

    tag: string;
    class: Array<string>;
    id: string;

    content: string | number;
    children: Array<string>;
    data: Record<string, string | number>
}
