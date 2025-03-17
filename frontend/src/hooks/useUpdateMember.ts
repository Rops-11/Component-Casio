import { useState } from "react";
import { toast } from "react-toastify";
import { Member } from "../types/member.types";
import { normalFetch } from "../utils/fetch";

const useUpdateMember = () => {
  const [isLoading, setIsLoading] = useState(false);

  const updateMember = async (member: Member) => {
    setIsLoading(true);
    const response = await normalFetch(`/member/${member.id}`, "PUT", member);

    setIsLoading(false);

    if (!response.ok) {
      toast.error("Failed to update member");
    }

    window.location.reload();
  };

  return { updateMember, isLoading };
};
export default useUpdateMember;
