import { Scrape } from "../src";

async function test() {
    const scrape = await new Scrape()
        .url('https://example.com/');

    console.log(scrape.html);
}

test();
