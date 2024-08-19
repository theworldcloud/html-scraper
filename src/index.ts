import fetch from "node-fetch";
import { Document } from "document";

export async function scrape(url: string): Promise<Document> {
    const response = await fetch(url);
    const html = await response.text();
    
    return new Document(html, url);
}
