import { setToken } from '@/lib/tokenStorage';
import { enhancedApi, GetMeResponseDto } from '@/store/api/gen/auth';
import { setIsLoggedIn } from '@/store/slice/isLoggedInSlice';
import { store } from '@/store/store';

const authApi = enhancedApi.enhanceEndpoints({
  addTagTypes: ['me', 'users'],
  endpoints: {
    authControllerLogin: {
      invalidatesTags: (result) => {
        if (result) {
          setToken(result.accessToken);

          return ['me'];
        }
        return [];
      },
    },
    authControllerMe: {
      transformResponse: (value: GetMeResponseDto) => {
        if (value.id) {
          store.dispatch(setIsLoggedIn({ value: true }));
        }
        return value;
      },
      providesTags: (result) => [
        'me' as const,
        ...(result ? [{ type: 'users' as const, id: result.id }] : []),
      ],
    },
  },
});

export default authApi;
