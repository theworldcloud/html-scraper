import { test, expect } from "vitest";
import { scrape } from "../src";

test("find/example.com", async function() {
    const document = await scrape("https://example.com/");
    const element = document.find("h1");

    expect(element.tag).toBe("h1");
    expect(element.parent).toBe("div");
    expect(element.content).toBe("Example Domain");
});
