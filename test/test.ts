import { scrape } from "../src";

async function test() {
    const doc = await scrape("https://example.com/");
    const element = doc.find("h1");

    console.log(doc, element);
}

test();
