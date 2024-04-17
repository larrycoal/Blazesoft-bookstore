import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tbook } from "../../../types/bookType";
import { initialBooks } from "./constants";
import { Tedit } from "@/types/editType";
type Allbooks = { books: Tbook[] };

type InitialState = {
  value: Allbooks;
};
const initialState = {
  value: {
    books: initialBooks,
  } as Allbooks,
} as InitialState;

export const book = createSlice({
  name: "book",
  initialState,
  reducers: {
    getAllBooks: (state) => {
      return state;
    },
    addBook: (state: InitialState, action: PayloadAction<Tbook>) => {
      state.value.books = [...state.value.books, action.payload];
    },
    deleteBook: (state: InitialState, action: PayloadAction<number>) => {
      state.value.books = state.value.books.filter(
        (book, idx) => idx !== action.payload && book
      );
    },
    editBook: (state: InitialState, action: PayloadAction<Tedit>) => {
      state.value.books.splice(action.payload.id, 1, action.payload.book);
    },
  },
});

export const { getAllBooks, addBook, deleteBook, editBook } = book.actions;
export default book.reducer;
