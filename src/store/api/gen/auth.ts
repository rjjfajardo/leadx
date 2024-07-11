import { baseApi as api } from '../baseApi';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    authControllerLogin: build.mutation<
      AuthControllerLoginResponse,
      AuthControllerLoginArgs
    >({
      query: (queryArg) => ({
        url: `/api/auth/login`,
        method: 'POST',
        body: queryArg.loginRequestDto,
      }),
    }),
    authControllerMe: build.query<
      AuthControllerMeResponse,
      AuthControllerMeArgs
    >({
      query: () => ({ url: `/api/auth/me` }),
    }),
    authControllerLogout: build.mutation<
      AuthControllerLogoutResponse,
      AuthControllerLogoutArgs
    >({
      query: () => ({ url: `/api/auth/logout`, method: 'POST' }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type AuthControllerLoginResponse = /** status 200  */ LoginResponseDto;
export type AuthControllerLoginArgs = {
  loginRequestDto: LoginRequestDto;
};
export type AuthControllerMeResponse = /** status 200  */ GetMeResponseDto;
export type AuthControllerMeArgs = void;
export type AuthControllerLogoutResponse = unknown;
export type AuthControllerLogoutArgs = void;
export type LoginResponseDto = {
  id: string;
  accessToken: string;
};
export type LoginRequestDto = {
  personnelName: string;
  password: string;
};
export type ResourceType =
  | 'ALL'
  | 'USERS'
  | 'ROLES'
  | 'LEADS'
  | 'BOOKS'
  | 'TAGS'
  | 'STATUS'
  | 'COMMENTS'
  | 'SCHEDULED_ACTIVITIES'
  | 'CONFIGS'
  | 'COMPANIES'
  | 'CONTACTS';
export type AccessType =
  | 'ALL'
  | 'LIST'
  | 'READ'
  | 'CREATE'
  | 'UPDATE'
  | 'DELETE'
  | 'PROCESS'
  | 'EXPORT'
  | 'UPLOAD'
  | 'DOWNLOAD';
export type ResourcePermission = {
  type: ResourceType;
  accessTypes: AccessType[];
};
export type Permission = {
  resourcePermissions: ResourcePermission[];
};
export type RoleForUser = {
  id: string;
  name: string;
  permission: Permission;
};
export type LoginUser = {
  id: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  roles: RoleForUser[];
};
export type GetMeResponseDto = {
  id: string;
  accessToken: string;
  lastLoggedInAt: string;
  personnel: LoginUser;
};
export const {
  useAuthControllerLoginMutation,
  useAuthControllerMeQuery,
  useAuthControllerLogoutMutation,
} = injectedRtkApi;
