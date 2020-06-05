import axios from "axios";
import { returnErrors } from "./message";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_LEADS,
} from "./types";

// check token & load user
export const loadUser = () => (dispatch, getState) => {
  // User Loading
  dispatch({ type: USER_LOADING });

  //   //Get token from state
  //   const token = getState().auth.token;

  //   // Headers
  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   };

  //   // If token, add to headers config
  //   if (token) {
  //     config.headers["Authorization"] = `Token ${token}`;
  //   }

  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

// login action
export const login = (username, password) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  body = JSON.stringify({ username, password });

  axios
    .get("/api/auth/login", body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

// REGISTER USER
export const register = ({ username, password, email }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  body = JSON.stringify({ username, password, email });

  axios
    .get("/api/auth/login", body, config)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.reponse.data, err.response.status));
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

// logout
export const logout = () => (dispatch, getState) => {
  // User Loading
  //   dispatch({ type: USER_LOADING });

  //   //Get token from state
  //   const token = getState().auth.token;

  //   // Headers
  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   };

  // If token, add to headers config
  //   if (token) {
  //     config.headers["Authorization"] = `Token ${token}`;
  //   }

  axios
    .post("/api/auth/logout", null, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: CLEAR_LEADS });
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const tokenConfig = (getState) => {
  //Get token from state
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // If token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};
