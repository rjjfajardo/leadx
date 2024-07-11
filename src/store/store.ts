import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { baseApi } from '@/store/api/baseApi';
import breadcrumbsReducer from '@/store/slice/breadcrumbsSlice';
import isLoggedInReducer from '@/store/slice/isLoggedInSlice';
import snackbarReducer from '@/store/slice/snackbarSlice';

const reducer = combineReducers({
  // apis
  [baseApi.reducerPath]: baseApi.reducer,
  //slices
  isLoggedIn: isLoggedInReducer,
  snackbar: snackbarReducer,
  breadcrumb: breadcrumbsReducer,
});

const middleware = [baseApi.middleware];

export const setupStore = () => {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => [
      ...middleware,
      ...getDefaultMiddleware({}),
    ],
  });
};

// /**
//  * The redux store for the application.
//  * @public
//  */
export const store = setupStore();
// /**
//  * The top level redux state for the application.
//  */
export type RootState = ReturnType<typeof reducer>;

// /**
//  * The redux dispatch function type.
//  */
export type AppDispatch = typeof store.dispatch;
