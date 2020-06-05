import axios from "axios";
import { createMessage, returnErrors } from "./message";

import { GET_LEADS, DELETE_LEAD, ADD_LEAD } from "./types";

import { tokenConfig } from "./auth";

//get leads
export const getLeads = () => (dispatch, getState) => {
  axios
    .get("/api/leads/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_LEADS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// Delete
export const deleteLead = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/leads/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ leadDelete: "Lead Deleted" }));
      dispatch({
        type: DELETE_LEAD,
        payload: id,
      });
    })
    .catch((err) => console.log(err));
};

//add leads
export const addLead = (lead) => (dispatch, getState) => {
  axios
    .post("/api/leads/", lead, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ leadAdd: "Lead Addeds" }));
      dispatch({
        type: ADD_LEAD,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
  // .catch((err) => {
  //   const errors = {
  //     msg: err.response.data,
  //     status: err.response.status,
  //   };
  //   dispatch({
  //     type: GET_ERRORS,
  //     payload: errors,
  //   });
  // });
  //.catch((err) => console.log(err));
};
