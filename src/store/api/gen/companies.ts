import { baseApi as api } from '../baseApi';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    companiesControllerCreate: build.mutation<
      CompaniesControllerCreateResponse,
      CompaniesControllerCreateArgs
    >({
      query: (queryArg) => ({
        url: `/api/companies`,
        method: 'POST',
        body: queryArg.createCompanyDto,
      }),
    }),
    companiesControllerFindAll: build.query<
      CompaniesControllerFindAllResponse,
      CompaniesControllerFindAllArgs
    >({
      query: () => ({ url: `/api/companies` }),
    }),
    companiesControllerFindOne: build.query<
      CompaniesControllerFindOneResponse,
      CompaniesControllerFindOneArgs
    >({
      query: (queryArg) => ({ url: `/api/companies/${queryArg.id}` }),
    }),
    companiesControllerRemove: build.mutation<
      CompaniesControllerRemoveResponse,
      CompaniesControllerRemoveArgs
    >({
      query: (queryArg) => ({
        url: `/api/companies/${queryArg.id}`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type CompaniesControllerCreateResponse = unknown;
export type CompaniesControllerCreateArgs = {
  createCompanyDto: CreateCompanyDto;
};
export type CompaniesControllerFindAllResponse =
  /** status 200  */ FindAllCompaniesResponseDto;
export type CompaniesControllerFindAllArgs = void;
export type CompaniesControllerFindOneResponse = unknown;
export type CompaniesControllerFindOneArgs = {
  id: string;
};
export type CompaniesControllerRemoveResponse = unknown;
export type CompaniesControllerRemoveArgs = {
  id: string;
};
export type CreateCompanyDto = {
  name: string;
};
export type CompaniesForFindAll = {
  id: string;
  name: string;
};
export type FindAllCompaniesResponseDto = {
  data: CompaniesForFindAll[];
};
export const {
  useCompaniesControllerCreateMutation,
  useCompaniesControllerFindAllQuery,
  useCompaniesControllerFindOneQuery,
  useCompaniesControllerRemoveMutation,
} = injectedRtkApi;
