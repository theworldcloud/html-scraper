export function _getTagHtml(html: string, tag: string) {
    const regex = new RegExp(`<${tag}.*?>(.*?)<\/${tag}>`, "s");
    const matchedhtml = html.match(regex)
    if (!matchedhtml) return "";

    const startIndex = html.indexOf(`<${tag}`);
    const endIndex = html.indexOf(`</${tag}>`) + 8;
    const htmltag = html.slice(startIndex, endIndex);
    html = html.replace(htmltag, "");

    return [ matchedhtml[0], html ];
}