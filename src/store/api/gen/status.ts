import { baseApi as api } from '../baseApi';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    statusControllerCreate: build.mutation<
      StatusControllerCreateResponse,
      StatusControllerCreateArgs
    >({
      query: (queryArg) => ({
        url: `/api/status`,
        method: 'POST',
        body: queryArg.createStatusDto,
      }),
    }),
    statusControllerFindAll: build.query<
      StatusControllerFindAllResponse,
      StatusControllerFindAllArgs
    >({
      query: () => ({ url: `/api/status` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type StatusControllerCreateResponse = unknown;
export type StatusControllerCreateArgs = {
  createStatusDto: CreateStatusDto;
};
export type StatusControllerFindAllResponse =
  /** status 200  */ FindAllStatusResponseDto;
export type StatusControllerFindAllArgs = void;
export type CreateStatus = {
  label: string;
  description: string;
  colorValue: string;
};
export type CreateStatusDto = {
  status: CreateStatus[];
};
export type StatusForFindAll = {
  id: number;
  label: string;
  description: string;
  colorValue: string;
};
export type FindAllStatusResponseDto = {
  data: StatusForFindAll[];
};
export const {
  useStatusControllerCreateMutation,
  useStatusControllerFindAllQuery,
} = injectedRtkApi;
