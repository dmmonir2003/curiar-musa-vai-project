// // import { clearAuthStorage } from "../redux/slice/user/UserSlice";
// // import { store } from "../redux/store";

// export const requestHandler = (request: any) => {
//     const token = localStorage.getItem("token");
//     if (token) request.headers.Authorization = `Bearer ${token}`;
//     return request;
//   };

//   export const successHandler = (response: any) => {
//     return {
//       ...response,
//       data: response.data,
//     };
//   };
//   export const errorHandler = (error: any) => {
//     const { status, data } = error?.response;
//     if (
//       status === 401 ||
//       data?.message === "Unauthorized Access to an operation"
//     ) {
//       // const { dispatch } = store;
//       // dispatch(clearAuthStorage());
//     }
//     return Promise.reject(error);
//   };

// In requestModifications.js

import { store } from "../store/store"; // <-- 1. Import your Redux store
// import { clearAuthStorage } from "../redux/slice/user/UserSlice";

export const requestHandler = (request: any) => {
  // 2. Get state directly from the store
  const accessToken = store.getState().user.accessToken;

  // 3. Only add the header if the token exists
  if (accessToken) {
    request.headers.Authorization = `${accessToken}`;
  }
  return request;
};

export const successHandler = (response: any) => {
  return {
    ...response,
    data: response.data,
  };
};

export const errorHandler = (error: any) => {
  const { status, data } = error?.response;
  if (
    status === 401 ||
    data?.message === "Unauthorized Access to an operation"
  ) {
    // const { dispatch } = store;
    // dispatch(clearAuthStorage());
  }
  return Promise.reject(error);
};
