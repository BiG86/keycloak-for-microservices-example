import {Activities} from "./commons-model";

// The Book model class

// Book
// This is the main Book entity interface
export interface Book {
  id: number;
  isbn: string;
  author: string;
  title: string;
  activities?: Activities;
}

// IBookInterface
// This interface adds a success boolean to the Book interface
export interface IBookResponse extends Book {
  success?: boolean;
}

// IBookRequest
// This interface is the main Book request interface
export interface IBookRequest {
  id?: string;
  isbn: string;
  author: string;
  title: string;
  insertDate?: Date;
  updateDate?: Date;
  updateUser?: string;
}

// BookListResponse
// This interface is the main Book entity list response
export interface BookListResponse {
  payload: Book[],
  totalNumber: number
}
