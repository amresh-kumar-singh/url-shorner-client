import { useEffect, useState } from "react";
import Instance from "../axios/axiosInstance";
import { UserState } from "../context";

const useAxios = () => {
  const { setUser, setStorage } = UserState();

  const [response, setResponse] = useState(null);
  const [ServerError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [controller, setController] = useState();

  const Fetch = async (configObj) => {
    const { method, url, requestConfig = {} } = configObj;

    try {
      setLoading(true);
      const ctrl = new AbortController();
      setController(ctrl);

      const res = await Instance[method.toLowerCase()](url, {
        ...requestConfig,
        signal: ctrl.signal,
      });

      setUser(res.data);
      // setStorage((prev) => [...new Set([...prev, ...res.data.data.urls])]);
      setStorage(res.data.data.urls);
    } catch (err) {
      setResponse("");
      setServerError(err);
      console.log(ServerError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // console.log("useAxios");
    return () => controller && controller.abort();
  }, [controller]);

  return [response, loading, ServerError, Fetch];
};

export default useAxios;
