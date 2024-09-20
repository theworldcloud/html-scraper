import { scrape } from "../src";
import {Options} from "../src/types";

async function test() {
    const doc = await scrape("https://example.com/");
    const element = doc.find("h1");

    console.log(doc);
    console.log("");
    console.log(element);
}

test();

