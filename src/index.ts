import fetch from 'node-fetch';
import { ScrapeElement } from "types";


export class Scrape {
    public html = "";

    public async url(url: string) {
        const response = await fetch(url);
        this.html = await response.text();

        return this;
    }   
}