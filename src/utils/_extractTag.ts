import { _extractAttribute } from "utils/_extractAttribute";

export function _extractTag(html: string, selectorTag: string, selectorId: string | undefined, selectorClasses: Array<string>): [ number, string, string | undefined, Array<string> ] {
    let startIndex = -1;
    const regex = new RegExp(`<${selectorTag}(.*?)>`, "g");
    const matches = html.match(regex) ?? [];

    matches.forEach(function(match) {
        const mhtml = match.replace("<", "").replace(">", "");
        const tag = mhtml.split(" ").shift() ?? "";
        const attributes = mhtml.replace(`${tag} `, "");

        if (selectorTag !== tag && selectorTag.length > 0) return;

        const id = _extractAttribute(attributes, "id");
        const classes = _extractAttribute(attributes, "class")?.split(" ") ?? [];
        if (selectorId && id !== selectorId) return;
        if (selectorClasses.length > 0 && !selectorClasses.every((c) => classes.includes(c))) return;

        startIndex = html.indexOf(match);
        if (selectorTag.length === 0) selectorTag = tag;
        if (!selectorId) selectorId = id;
        if (selectorClasses.length === 0) selectorClasses = classes;
    });

    return [ startIndex, selectorTag, selectorId, selectorClasses ];
}