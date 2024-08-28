import fetch from "node-fetch";
import { Document } from "./document";
import { RequestInit } from "node-fetch";

export async function scrape(url: string, fetchOptions?: RequestInit): Promise<Document> {
    const response = await fetch(url, fetchOptions);
    const html = await response.text();

    return new Document(html, url, response);
}
