import { test, expect } from "vitest";
import { scrape } from "../src";

test("title/example.com", async function() {
    const document = await scrape("https://example.com/");
    expect(document.title).toBe("Example Domain");
});
