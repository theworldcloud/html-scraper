# Types
All the types used in the package are documented here.

## Document
The `Document` type is returning following properties:

```typescript
html: string; // The HTML content of the website
url: string; // The URL of the website
title: string; // The title of the website

find: (selector: string) => Element | undefined;
```