import { useEffect, useState } from "react";
import { UserState } from "../../context";
import useRefresh from "../../hooks/useRefresh";

const PersistUser = ({ children }) => {
  const { user } = UserState();
  const [loading, setLoading] = useState(false);
  const refresh = useRefresh();
  // const [validUrl, setValidUrl] = useState(true)
  useEffect(() => {
    const verifyRefreshToken = async () => {
      console.log("verifyRefreshToken");
      try {
        setLoading(true);
        await refresh();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    // this is being called twice in <React StrictMode>
    !user?.accessToken ? verifyRefreshToken() : setLoading(false);
  }, []);

  return <>{children}</>;
};

export default PersistUser;
