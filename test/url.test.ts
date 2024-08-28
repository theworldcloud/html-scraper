import { test, expect } from "vitest";
import { scrape } from "../src";

test("url/example.com", async function() {
    const document = await scrape("https://example.com/");
    expect(document.url).toBe("https://example.com/");
});
