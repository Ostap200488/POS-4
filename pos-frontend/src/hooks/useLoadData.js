import { useEffect } from "react";
import { getUserData } from "../https";

const useLoadData = () => {
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await getUserData();
        console.log(data);
      } catch (error) {
        console.error("Failed to load user:", error);
      }
    };

    fetchUser();
  }, []);
};

export default useLoadData;
