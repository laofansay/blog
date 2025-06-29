// @ts-nocheck
import axios, { AxiosResponse } from "axios";
import { Storage } from "react-jhipster";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "@/store/store";

import { serializeAxiosError } from "./reducer.utils";

const AUTH_TOKEN_KEY = "jhi-authenticationToken";

const apiUrl = "";

export const initialState = {
  loading: false,
  isAuthenticated: false,
  loginSuccess: false,
  loginError: false, // Errors returned from server side
  showModalLogin: false,
  account: {} as any,
  errorMessage: null as unknown as string, // Errors returned from server side
  redirectMessage: null as unknown as string,
  sessionHasBeenFetched: false,
  logoutUrl: null as unknown as string,
};

export type AuthenticationState = Readonly<typeof initialState>;

// Actions

export const getSession = (): AppThunk => (dispatch, getState) => {
  dispatch(getAccount());
};

export const getAccount = createAsyncThunk(
  "authentication/get_account",
  async () => axios.get<any>(`${apiUrl}/admin/base/comm/person`),
  {
    serializeError: serializeAxiosError,
  }
);

interface IAuthParams {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export const authenticate = createAsyncThunk(
  "authentication/login",
  async (auth: IAuthParams) =>
    axios.post<any>(`${apiUrl}/admin/base/open/login`, auth),
  {
    serializeError: serializeAxiosError,
  }
);

export const login: (
  username: string,
  password: string,
  rememberMe?: boolean
) => AppThunk =
  (username, password, rememberMe = false) =>
  async (dispatch) => {
    const result = await dispatch(
      authenticate({ username, password, rememberMe })
    );
    const response = result.payload as AxiosResponse;
    
    if (response.data.code==1000) {
      const jwt = response.data.data.token;
      if (rememberMe) {
        Storage.local.set(AUTH_TOKEN_KEY, jwt);
      } else {
        Storage.session.set(AUTH_TOKEN_KEY, jwt);
      }
      dispatch(getSession());
    }else{
      dispatch(authError(response.data.message));
    }
  };

export const clearAuthToken = () => {
  if (Storage.local.get(AUTH_TOKEN_KEY)) {
    Storage.local.remove(AUTH_TOKEN_KEY);
  }
  if (Storage.session.get(AUTH_TOKEN_KEY)) {
    Storage.session.remove(AUTH_TOKEN_KEY);
  }
};

export const logout: () => AppThunk = () => (dispatch) => {
  clearAuthToken();
  dispatch(logoutSession());
};

//@ts-ignore
export const clearAuthentication = (messageKey) => (dispatch) => {
  clearAuthToken();
  dispatch(authError(messageKey));
  dispatch(clearAuth());
};

export const AuthenticationSlice = createSlice({
  name: "authentication",
  initialState: initialState as AuthenticationState,
  reducers: {
    logoutSession() {
      return {
        ...initialState,
        showModalLogin: true,
      };
    },
    authError(state, action) {
      return {
        ...state,
        showModalLogin: true,
        redirectMessage: action.payload,
      };
    },
    clearAuth(state) {
      return {
        ...state,
        loading: false,
        showModalLogin: true,
        isAuthenticated: false,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(authenticate.rejected, (state, action) => ({
        ...initialState,
        errorMessage: action.error.message,
        showModalLogin: true,
        loginError: true,
      }))
      .addCase(authenticate.fulfilled, (state) => ({
        ...state,
        loading: false,
        loginError: false,
        showModalLogin: false,
        loginSuccess: true,
      }))
      .addCase(getAccount.rejected, (state, action) => ({
        ...state,
        loading: false,
        isAuthenticated: false,
        sessionHasBeenFetched: true,
        showModalLogin: true,
        errorMessage: action.error.message,
      }))
      .addCase(getAccount.fulfilled, (state, action) => {
        const isAuthenticated =
          action.payload &&
          action.payload.data &&
          action.payload.data.data.status==1;
        return {
          ...state,
          isAuthenticated,
          loading: false,
          sessionHasBeenFetched: true,
          account: action.payload.data.data,
        };
      })
      .addCase(authenticate.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAccount.pending, (state) => {
        state.loading = true;
      });
  },
});

export const { logoutSession, authError, clearAuth } =
  AuthenticationSlice.actions;

// Reducer
export default AuthenticationSlice.reducer;
