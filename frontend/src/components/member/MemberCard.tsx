import { useMutation } from "@tanstack/react-query";
import { Member } from "../../types/member.types";
import { normalFetch } from "../../utils/fetch";
import DeleteButton from "../utils/DeleteButton";
import { toast } from "react-toastify";
import ModalButton from "../utils/ModalButton";

interface Props {
  member: Member;
  setEditModal: (modal: boolean) => void;
  setMember: (member: Member) => void;
}

const MemberCard = ({ member, setEditModal, setMember }: Props) => {
  const deleteHandler = async (id: string) => {
    const response = await normalFetch(`/member/${id}`, "DELETE");

    if (response.ok) {
      window.location.reload();
    } else {
      toast.error("Failed to delete member");
    }

    return response.json();
  };
  const mutation = useMutation({
    mutationFn: deleteHandler,
  });

  if (mutation.isPending) {
    return <div>Deleting...</div>;
  }

  if (mutation.isError) {
    return <div>Error deleting member</div>;
  }

  const handleClick = () => {
    setMember(member);
    setEditModal(true);
  };

  return (
    <div className="flex w-full h-auto p-3 bg-gray-400 rounded border-2">
      <div className="flex w-1/6 text-center justify-center items-center">
        {member.firstName} {member.lastName}
      </div>
      <div className="flex w-1/6 text-center justify-center items-center">
        {member.groupName}
      </div>
      <div className="flex w-1/6 text-center justify-center items-center">
        {member.role}
      </div>
      <div className="flex w-1/6 text-center justify-center items-center">
        {member.expectedSalary}
      </div>
      <div className="flex w-1/6 text-center justify-center items-center">
        {member.expectedDateOfDefense}
      </div>
      <div className="flex w-1/6 space-x-2">
        <ModalButton
          handleClick={handleClick}
          text="Update Member"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
        />
        <DeleteButton deleteFunction={() => mutation.mutate(member.id!)} />
      </div>
    </div>
  );
};

export default MemberCard;
