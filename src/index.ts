import fetch from "node-fetch";
import { Document } from "./document";
import type { Options } from "./types";

async function scrape(url: string, options?: Options): Promise<Document> {
    if (options?.cookies) {
        const cookies: Array<string> = [];

        Object.keys(options.cookies).forEach(function(key) {
            const value = options.cookies![key];
            const cookie = `${key}=${value};`;
            cookies.push(cookie);
        });

        if (!options.headers) options.headers = {};
        options.headers["Cookie"] = cookies.join("");
    }

    const response = await fetch(url, options);
    const html = await response.text();

    return new Document(html, url, response);
}

export { scrape, type Options };