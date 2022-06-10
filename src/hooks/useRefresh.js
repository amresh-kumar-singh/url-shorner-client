import Instance from "../axios/axiosInstance";
import { UserState } from "../context";

const useRefresh = () => {
  const { setUser } = UserState();

  const refresh = async () => {
    try {
      const res = await Instance.get("/refresh");
      console.log("res", res);
      setUser((prev) => ({
        ...prev,
        accessToken: res.data.accessToken,
        email: res.data.email,
      }));
      return res.data.accessToken;
    } catch (error) {
      console.log("error refresh");
    }
  };

  return refresh;
};

export default useRefresh;
