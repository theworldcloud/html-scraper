# Types
All the types used in the package are documented here.

## Options
The `Options` type has following properties:
```typescript
method: "GET" | "POST"; // The scrape fetch method
headers: Record<string, string>; // The headers included in the request
cookies: Record<string, string>; // The cookies included in the request
body: Record<string, string> | FormData | string; // The body in the request (Only works if method is POST)
```

## Document
The `Document` type has following properties:

```typescript
html: string; // The HTML content of the website
url: string; // The URL of the website
title: string; // The title of the website

find: (selector: string) => Element | undefined;
findAll: (selector: string) => Array<Element>;
```

## Element
The `Element` type has following properties:
```typescript
tag: string; // The element' tag
id: string | undefined; // The id of the element
class: Array<string>; // The element' classes. 
parent: string; // The parent tag with id and class of the element
children: Array<string>; // The children tags with id and class of the element
content: string; // The content inside the element
attributes: Record<string, string | number>; // The element' attributes 
data: Record<string, string | number>; // The element' data attributes

find: (selector: string) => Element | undefined;
findAll: (selector: string) => Array<Element>;
```

