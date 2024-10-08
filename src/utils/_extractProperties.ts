import { Properties } from "../types";

import { regex } from "../parser/regex";

export function _extractProperties(selector: string) {
    const properties: Properties = { tag: "", id: "", class: [] };

    const id = selector.match(regex("[#!?][a-zA-Z0-9!@#$&()\\-_+,/]*", "g"));
    if (id) {
        properties.id = id[0].replace("#", "");
        selector = selector.replace(id[0], "");
    }

    const classes = selector.match(regex("[.!?][a-zA-Z0-9!@#$&()\\-_+,/]*", "g"));
    if (classes) {
        classes.forEach(function (name) {
            properties.class.push(name.replace(".", ""));
            selector = selector.replace(name, "");
        });
    }

    properties.tag = selector;
    return properties;
}