import { baseApi as api } from '../baseApi';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    usersControllerFindAllSalesAgents: build.query<
      UsersControllerFindAllSalesAgentsResponse,
      UsersControllerFindAllSalesAgentsArgs
    >({
      query: (queryArg) => ({
        url: `/api/users/sales-agents`,
        params: { tier: queryArg.tier },
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type UsersControllerFindAllSalesAgentsResponse =
  /** status 200  */ FindAllSalesAgentsResponseDto;
export type UsersControllerFindAllSalesAgentsArgs = {
  tier?: string | null;
};
export type PositionForSalesAgent = {
  tier: string;
};
export type SalesAgentForFindAll = {
  id: string;
  firstName: string;
  lastName: string;
  assignedLeadsCount: number;
  positions: PositionForSalesAgent[];
};
export type FindAllSalesAgentsResponse = {
  salesAgents: SalesAgentForFindAll[];
};
export type FindAllSalesAgentsResponseDto = {
  data: FindAllSalesAgentsResponse;
};
export const { useUsersControllerFindAllSalesAgentsQuery } = injectedRtkApi;
