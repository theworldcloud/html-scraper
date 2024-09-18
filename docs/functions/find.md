# Functions > find
The `find` function is used to find the first element of a specific selector in the HTML of the provided url. 

\
The function is available to call from the [`Document`](/types#Document) and [`Element`](/types#Element) type. \
The function returns a [`Element`](/types#Element) type or `undefined`.
```typescript
find: (selector: string) => Element | undefined;
```

\
A example of how to use the `find` function is provided below:
```typescript
const element = /** variable of document or element **/.find('div > span');
```
