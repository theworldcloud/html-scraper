# Functions > findAll
The `findAll` function is used to find all the elements of a specific selector in the HTML of the provided url.

\
The function is available to call from the [`Document`](/types#Document) and [`Element`](/types#Element) type. \
The function returns an `array` of [`Element`](/types#Element) type. \
If no elements was found, it'll return a empty `array`.
```typescript
findAll: (selector: string) => Array<Element>;
```

\
A example of how to use the `find` function is provided below:
```typescript
const elements = /** variable of document or element **/.findAll('span');
```
