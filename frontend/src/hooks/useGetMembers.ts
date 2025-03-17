import { useQuery } from "@tanstack/react-query";
import { Member } from "../types/member.types";
import { normalFetch } from "../utils/fetch";

const useGetMembers = () => {
  const { data, error, isLoading } = useQuery<Member[]>({
    queryKey: ["members"],
    queryFn: async () => {
      const response = await normalFetch("/member", "GET").then((res) =>
        res.json()
      );

      return response.data;
    },
  });

  return { data, error, isLoading };
};

export default useGetMembers;
