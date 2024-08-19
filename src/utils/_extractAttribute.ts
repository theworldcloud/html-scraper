export function _extractAttribute(html: string, attribute: string) {
    const regex = new RegExp(`${attribute}=(["|'])(.*?)(["|'])`, "g");
    const attrs = html.split(regex);

    const str = attrs.map((attr) => attr.trim()).filter(function (attr) {
        if (attr.length === 0) return false;
        if (attr.includes(`=`)) return false;
        if (attr.includes(`"`)) return false;
        // noinspection RedundantIfStatementJS
        if (attr.includes(`'`)) return false;

        return true;
    }).join(" ");

    const array = str.split(" ").filter((r) => r.length > 0);
    const result = array.join(" ").trim();

    if (result.length === 0) return undefined;
    return result;
}