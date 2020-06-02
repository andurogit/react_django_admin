import axios from "axios";
import { createMessage, returnErrors } from "./message";

import { GET_LEADS, DELETE_LEAD, ADD_LEAD, GET_ERRORS } from "./types";

//get leads
export const getLeads = () => (dispatch) => {
  axios
    .get("/api/leads/")
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
export const deleteLead = (id) => (dispatch) => {
  axios
    .delete(`/api/leads/${id}/`)
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
export const addLead = (lead) => (dispatch) => {
  axios
    .post("/api/leads/", lead)
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
