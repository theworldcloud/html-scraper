import { expect, test } from "vitest";
import { scrape } from "../src";

test("findAll/example.com", async function() {
    const document = await scrape("https://example.com/");
    const elements = document.findAll("p");

    expect(elements.length).toBe(2);

    expect(elements[0].tag).toBe("p");
    expect(elements[0].parent).toBe("div");
    expect(elements[0].children.length).toBe(0);
    expect(elements[0].content).toBe("This domain is for use in illustrative examples in documents. You may use this    domain in literature without prior coordination or asking for permission.");

    expect(elements[1].tag).toBe("p");
    expect(elements[1].parent).toBe("div");
    expect(elements[1].children.length).toBe(1);
    expect(elements[1].children[0]).toBe("a");
    expect(elements[1].content).toBe(undefined);
});
