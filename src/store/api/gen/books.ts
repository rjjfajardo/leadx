import { baseApi as api } from '../baseApi';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    booksControllerCreate: build.mutation<
      BooksControllerCreateResponse,
      BooksControllerCreateArgs
    >({
      query: (queryArg) => ({
        url: `/api/books`,
        method: 'POST',
        body: queryArg.createBookDto,
      }),
    }),
    booksControllerFindOneBook: build.query<
      BooksControllerFindOneBookResponse,
      BooksControllerFindOneBookArgs
    >({
      query: (queryArg) => ({
        url: `/api/books`,
        params: { bookId: queryArg.bookId },
      }),
    }),
    booksControllerUpdate: build.mutation<
      BooksControllerUpdateResponse,
      BooksControllerUpdateArgs
    >({
      query: (queryArg) => ({
        url: `/api/books`,
        method: 'PATCH',
        body: queryArg.updateBookDto,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type BooksControllerCreateResponse = unknown;
export type BooksControllerCreateArgs = {
  createBookDto: CreateBookDto;
};
export type BooksControllerFindOneBookResponse =
  /** status 200  */ FindOneBookResponseDto;
export type BooksControllerFindOneBookArgs = {
  bookId: string;
};
export type BooksControllerUpdateResponse = unknown;
export type BooksControllerUpdateArgs = {
  updateBookDto: UpdateBookDto;
};
export type Format = 'PAPERBACK' | 'HARDBACK' | 'AUDIO_BOOK' | 'E_BOOK';
export type PublisherCompany = {
  id: string;
  name: string;
};
export type BookPublisher = {
  year: number;
  bookFormat: Format;
  isbn: string | null;
  id?: number | null;
  publisher: PublisherCompany;
};
export type Book = {
  title: string;
  bookLink?: string | null;
  details?: BookPublisher[] | null;
};
export type CreateBookDto = {
  books?: Book[] | null;
  leadId: string;
};
export type PublisherForFindOneBook = {
  id: string;
  name: string;
};
export type BookPublisherForFindOneBook = {
  id: number;
  year: number;
  bookFormat: Format;
  isbn: string | null;
  publisher: PublisherForFindOneBook;
};
export type FindOneBook = {
  id: string;
  title: string;
  bookLink?: string | null;
  bookPublishers: BookPublisherForFindOneBook[];
};
export type FindOneBookResponseDto = {
  data: FindOneBook | null;
};
export type UpdateBookDto = {
  book?: Book | null;
  bookId: string;
};
export const {
  useBooksControllerCreateMutation,
  useBooksControllerFindOneBookQuery,
  useBooksControllerUpdateMutation,
} = injectedRtkApi;
