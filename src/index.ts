import { readFile } from "fs/promises";
import { Document } from "./document";

export async function scrape(url: string): Promise<Document> {
    // const response = await fetch(url);
    // const html = await response.text();

    const html = await scrapeOfflineTest(url);
    
    return new Document(html, url);
}

async function scrapeOfflineTest(fileName: string) {
    const file = `./test/offline_html/${fileName}.txt`;
    const html = await readFile(file, { encoding: "utf8" });

    return html;
}
