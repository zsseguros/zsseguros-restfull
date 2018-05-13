export const pagination = (begin: number, end: number, collection: Array<any>) => {
  return collection.slice(begin, end);
}