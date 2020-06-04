import { combineReducers } from "redux";
import leads from "./leads";
import errors from "./errors";
import message from "./message";
import auth from "./auth";

export default combineReducers({
  leads,
  errors,
  message,
  auth,
});
