import { _removeTags } from "parser/_removeTags";
import { parseHead } from "./parseHead";

const entities: Array<string> = [ "\n", "\t", "\r" ];

export function parse(html: string) {
    entities.forEach((entity) => html = html.replaceAll(entity, ""));
    let tags = html.split(/(<[^>]+>)/).filter((element) => element.trim().length > 0);
    tags = _removeTags(tags);

    const head = parseHead(tags);
    return {};
}