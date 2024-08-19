import { scrape } from "../src";

async function test() {
    // const doc = await scrape("https://en.wikipedia.org/wiki/TypeScript");
    const doc = await scrape("https://www.lectio.dk/lectio/477/help/mainhelp.aspx");
    console.log(doc.url);
    console.log(" ");

    // doc.find("main > header.mw-body-header > #firstHeading > span");
    // doc.find("div#bodyContent.vector-body > div.vector-body-before-content > div#siteSub");
    // doc.find("div.mw-footer-container > footer > #footer-places > li#footer-places-developers");

    // doc.find("div#bodyContent");

    console.log(" ");

    const el = doc.find(".infoText");
    console.log(el);
}

test();
