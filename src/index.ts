import fetch, { RequestInit } from "node-fetch";
import { Document } from "./document";
import { Options } from "./types";

export async function scrape(url: string, options?: Options): Promise<Document> {
    if (options?.cookies) {
        const cookies: Array<string> = [];

        Object.keys(options.cookies).forEach(function(key) {
            const value = options.cookies![key];
            const cookie = `${key}=${value};`;
            cookies.push(cookie);
        });

        if (!options.headers) options.headers = {};
        options.headers.cookie = cookies.join("");
    }

    const fetchOptions: RequestInit = {
        method: options?.method ?? "GET",
        headers: options?.headers ?? {}
    };

    if (fetchOptions.method === "POST")
        fetchOptions.body = JSON.stringify(options?.body ?? {});

    const response = await fetch(url, fetchOptions);
    const html = await response.text();

    return new Document(html, url, response);
}
