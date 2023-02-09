import {Book} from "../models/book-model";

export const findBookById = (id: number, books: Book[]): Book => {
  if (!!books && books.length) {
    return books.find( el => el.id === id);
  }
  return null;
}
