# Usage
When you have installed the package, you can use it in your code like this:

```typescript
import { scrape } from 'html-scraper';
```



## Scrape
The `scrape` function takes one-two arguments, which is the url of the website you want to scrape. 
The function returns a `Promise` with a `class` of a [`Document`](/types#Document) type. 

```typescript
scrape: (url: string, options?: Options) => Promise<Document>;
```

The first argument is the url of the website you want to scrape the html of. \
The second argument is the options for the request. The options argument is optional! \
The second argument is a [`Options`](/types#Options) type

## Examples

```typescript
// async example

const document = await scrape('url here');
// your code here...
```

```typescript
// sync example

scrape('url here').then((document) => {
    // your code here...
});
```



