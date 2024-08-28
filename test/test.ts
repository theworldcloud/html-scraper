import { scrape } from "../src";

async function test() {
    // const lectioInformationDocument = await scrape("https://www.lectio.dk/lectio/477/login.aspx");
    // const sessionId = lectioInformationDocument.cookies["ASP.NET_SessionId"];

    const doc = await scrape("https://www.lectio.dk/lectio/477/login.aspx");
    const divElement = doc.find("nav > div");
    // const test = divElement.find()
}

test();
