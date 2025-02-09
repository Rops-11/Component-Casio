import { useEffect, useState } from "react";
import { User } from "../types/user.types";

const useGetUsers = () => {
  const [data, setData] = useState<User[]>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () =>
      await fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((json) => {
          setData(json);
          setLoading(false);
        });

    fetchData();
  }, []);

  return { data, loading };
};

export default useGetUsers;
