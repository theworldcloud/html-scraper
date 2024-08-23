# Usage
When you have installed the package, you can use it in your code like this:

```typescript
import { scrape } from 'html-scraper';
```



## Scrape
The `scrape` function takes one argument, which is the url of the website you want to scrape. 
The function returns a `Promise` with a `class` of a [`Document`](/types#Document) type. 

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



