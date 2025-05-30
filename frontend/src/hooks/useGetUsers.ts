import { useEffect, useState } from "react";
import { User } from "../types/user.types";
import { normalFetch } from "../utils/fetch";

const useGetUsers = () => {
  const [data, setData] = useState<User[]>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      await normalFetch("/user", "get")
        .then((response) => response.json())
        .then((json) => {
          setData(json.data);
          setLoading(false);
        });
    };

    fetchData();
  }, []);

  return { data, loading };
};

export default useGetUsers;
