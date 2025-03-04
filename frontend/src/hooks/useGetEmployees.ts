import { useEffect, useState } from "react";
import { normalFetch } from "../utils/fetch";
import { Employee } from "../types/employee.types";

const useGetEmployees = () => {
  const [data, setData] = useState<Employee[]>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      await normalFetch("/employee", "get")
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

export default useGetEmployees;
