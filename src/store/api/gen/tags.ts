import { baseApi as api } from '../baseApi';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    tagsControllerCreate: build.mutation<
      TagsControllerCreateResponse,
      TagsControllerCreateArgs
    >({
      query: (queryArg) => ({
        url: `/api/tags`,
        method: 'POST',
        body: queryArg.createTagDto,
      }),
    }),
    tagsControllerFindAll: build.query<
      TagsControllerFindAllResponse,
      TagsControllerFindAllArgs
    >({
      query: () => ({ url: `/api/tags` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type TagsControllerCreateResponse = unknown;
export type TagsControllerCreateArgs = {
  createTagDto: CreateTagDto;
};
export type TagsControllerFindAllResponse =
  /** status 200  */ FindAllTagResponseDto;
export type TagsControllerFindAllArgs = void;
export type CreateTag = {
  label: string;
  description: string | null;
  colorValue: string | null;
};
export type CreateTagDto = {
  tags: CreateTag;
};
export type TagForFindAll = {
  id: number;
  label: string;
  colorValue: string | null;
};
export type FindAllTagResponseDto = {
  data: TagForFindAll[];
};
export const {
  useTagsControllerCreateMutation,
  useTagsControllerFindAllQuery,
} = injectedRtkApi;
