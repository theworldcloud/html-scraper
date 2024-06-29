import { scrape } from "../src";

async function test() {
    const doc = await scrape("wikipedia.org-typescript");
    console.log(doc.url);
    console.log(" ");

    // doc.find("main > header.mw-body-header > #firstHeading > span");
    // doc.find("div#bodyContent.vector-body > div.vector-body-before-content > div#siteSub");
    // doc.find("div.mw-footer-container > footer > #footer-places > li#footer-places-developers");

    // doc.find("div#bodyContent");

    console.log(" ");

    // scrape.find("main")
    // scrape.find("footer");

    // doc.find("div.mw-footer-container > footer > ul#footer-places");
    const el = doc.find("div#p-personal > ul.vector-menu-content-list");
    console.log(el);
}

test();
