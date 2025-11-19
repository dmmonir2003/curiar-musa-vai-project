// import axios from "axios";
// import {
//   requestHandler,
//   successHandler,
//   errorHandler,
// } from "./requestModifications";
// import { API_BASE_URL } from "../constants";

// const httpRequest = (
//   config = {
//     headers: {
//       contentType: "application/json",
//     },
//   }
// ) => {
//   const instance = axios.create({
//     baseURL: API_BASE_URL,
//     headers: {
//       "Content-Type": config.headers.contentType || "application/json",
//     },
//   });

//   instance.interceptors.request.use(requestHandler);
//   instance.interceptors.response.use(successHandler, errorHandler);
//   return instance;
// };
// export default httpRequest();

import axios from "axios";
import {
  requestHandler,
  successHandler,
  errorHandler,
} from "./requestModifications";
import { API_BASE_URL } from "../constants";

const httpRequest = (config = {}) => {
  // Remove the default config
  const instance = axios.create({
    baseURL: API_BASE_URL,
    // headers: {} // <-- REMOVE THE DEFAULT HEADERS OBJECT
    // Axios will now correctly set Content-Type based on the data
  });

  instance.interceptors.request.use(requestHandler);
  instance.interceptors.response.use(successHandler, errorHandler);
  return instance;
};

export default httpRequest();
