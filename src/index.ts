import fetch, { RequestInit } from "node-fetch";
import { Document } from "./document";

interface Options {
    method?: "GET" | "POST";
    headers?: Record<string, string>;
    cookies?: Record<string, string>;
    body?: any;
}

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

    const fetchOptions: RequestInit = {
        redirect: "follow",

        method: options?.method ?? "GET",
        headers: options?.headers ?? {}
    };

    if (fetchOptions.method === "POST" && options?.body) {
        fetchOptions.body = options.body;
    }

    const response = await fetch(url, fetchOptions);
    const html = await response.text();

    return new Document(html, url, response);
}

export { scrape, type Options };