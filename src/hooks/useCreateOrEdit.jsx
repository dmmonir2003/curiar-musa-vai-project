// import { useCallback } from "react";
// import { useSelector } from "react-redux";
// import httpRequest from "../axios";
// import { selectAccessToken } from "../store/userSlice";
// import useUnauthenticate from "./handle-unauthenticated";

// const useCreateOrEdit = () => {
//   const accessToken = useSelector(selectAccessToken);
//   const unauthenticate = useUnauthenticate();

//   const submitData = useCallback(
//     async (endPoint, data, method = "POST", id) => {
//       const finalEndPoint = id ? `${endPoint}/${id}` : endPoint;
//       const url = method === "POST" ? httpRequest.post : httpRequest.patch;
//       console.log(data);
//       try {
//         const response = await url(finalEndPoint, data, {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         });

//         if (response.status === 200 || response.status === 201) {
//           return response;
//         }
//       } catch (err) {
//         if (err?.response?.status === 401) {
//           unauthenticate();
//         } else {
//           throw err;
//         }
//       }
//     },
//     [accessToken, unauthenticate]
//   );

//   return { submitData };
// };

// export default useCreateOrEdit;

import { useCallback } from "react";
import { useSelector } from "react-redux";
import httpRequest from "../axios";
import { selectAccessToken } from "../store/userSlice";
import useUnauthenticate from "./handle-unauthenticated";

const useCreateOrEdit = () => {
  const accessToken = useSelector(selectAccessToken);
  const unauthenticate = useUnauthenticate();

  const submitData = useCallback(
    // FIX 1: Swap 'method' and 'id'. Set id default to null.
    async (endPoint, data, id = null, method = "POST") => {
      // FIX 2: Logic ensures id is appended correctly
      const finalEndPoint = id ? `${endPoint}/${id}` : endPoint;

      // FIX 3: Add support for PUT, as you are using it for updates
      let url;
      if (method === "POST") {
        url = httpRequest.post;
      } else if (method === "PATCH") {
        url = httpRequest.patch;
      } else if (method === "PUT") {
        url = httpRequest.put;
      } else {
        url = httpRequest.post;
      }

      console.log("Data:", data);
      console.log("Target URL:", finalEndPoint); // This should now show /users/691a...

      try {
        const response = await url(finalEndPoint, data, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.status === 200 || response.status === 201) {
          return response;
        }
      } catch (err) {
        if (err?.response?.status === 401) {
          unauthenticate();
        } else {
          throw err;
        }
      }
    },
    [accessToken, unauthenticate]
  );

  return { submitData };
};

export default useCreateOrEdit;
