import { baseApi as api } from '../baseApi';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    systemLogsControllerFindAll: build.query<
      SystemLogsControllerFindAllResponse,
      SystemLogsControllerFindAllArgs
    >({
      query: (queryArg) => ({
        url: `/api/system-logs`,
        params: { leadId: queryArg.leadId },
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type SystemLogsControllerFindAllResponse =
  /** status 200  */ FindAllSystemLogResponseDto;
export type SystemLogsControllerFindAllArgs = {
  leadId: string | null;
};
export type SystemLogPersonnel = {
  firstName: string;
  lastName: string;
};
export type FormattedSystemLog = {
  id: string;
  createdAt: string;
  personnel: SystemLogPersonnel;
  log: string;
};
export type FindAllSystemLogResponseDto = {
  data: FormattedSystemLog[];
};
export const { useSystemLogsControllerFindAllQuery } = injectedRtkApi;
