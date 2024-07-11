import { enhancedApi } from '@/store/api/gen/books';

const bookApi = enhancedApi.enhanceEndpoints({
  addTagTypes: ['book', 'lead'],
  endpoints: {
    booksControllerCreate: {
      invalidatesTags: ['lead'],
    },
    booksControllerUpdate: {
      invalidatesTags: ['lead', 'book'],
    },
    booksControllerFindOneBook: {
      providesTags: ['book'],
    },
  },
});

export default bookApi;
