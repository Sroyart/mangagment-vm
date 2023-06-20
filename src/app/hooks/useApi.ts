import { makeClient } from "../services/makeClient";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/AppContext";
import { APIEndpointsEnum } from "@/types/Enums";

const useApi = () => {
  const { jwt } = useContext(AppContext);
  // get username and password from userContext
  const userName = "xQqEFnfR5JGg";
  const password = "448EbCwS2GmF";

  // const callApi = async (method, ...args) => {
  //   try {
  //     const { data } = await makeClient({
  //       headers: { authentification: jwt },
  //     })[method](...args);
  //     return data;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const callApi = async (
    endpoint: APIEndpointsEnum,
    value?: string | number
  ) => {
    const _action = !value ? endpoint : `${endpoint}=${value}`;
    console.log(_action);
    makeClient({
      method: "get",
      withCredentials: false,
      params: { username: userName, password: password, action: _action },
    }).then((res) => {
      const { data } = res;
      return data;
    });
  };

  return { callApi };
};

export default useApi;
