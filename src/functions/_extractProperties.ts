import { regex } from "../parser/regex";
import { Properties } from "../types";

export function _extractProperties(selector: string) {
    const properties: Properties = { tag: "", id: "", class: [] };

    const id = selector.match(regex("[#!?][a-zA-Z0-9!@#$&()\\-+,/]*", "g"));
    if (id) {
        properties.id = id[0].replace("#", "");
        selector = selector.replace(id[0], "");
    }

    const classes = selector.match(regex("[.!?][a-zA-Z0-9!@#$&()\\-+,/]*", "g"));
    if (classes) {
        classes.forEach(function (name) {
            properties.class.push(name.replace(".", ""));
            selector = selector.replace(name, "");
        });
    }

    properties.tag = selector;
    return properties;
}