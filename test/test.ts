import { scrape } from "../src";

async function test() {
    const doc = await scrape("https://www.lectio.dk/lectio/477/login.aspx?prevurl=forside.aspx");
    // const doc = await scrape("https://www.lectio.dk/lectio/477/help/mainhelp.aspx");
    // console.log(doc.url);
    // console.log(" ");

    // doc.find("main > header.mw-body-header > #firstHeading > span");
    // doc.find("div#bodyContent.vector-body > div.vector-body-before-content > div#siteSub");
    // const el = doc.find("div.mw-footer-container > footer > #footer-places > #footer-places-developers");
    // console.log(el);
    // doc.find("div#bodyContent");


    // const el = doc.find(".infoText");
}

test();
