import NavBar from "../components/utils/NavBar";
import MembersList from "../components/member/MembersList";
import { useState } from "react";
import MemberForm from "../components/member/MemberForm";
import { Member } from "../types/member.types";
import useUpdateMember from "../hooks/useUpdateMember";
import useAddMember from "../hooks/useAddMember";

const MembersPage = () => {
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [member, setMember] = useState<Member | null>(null);

  const { updateMember, isLoading: updateLoading } = useUpdateMember();

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateMember({
      id: member?.id || "",
      firstName: (e.target as any).firstName.value,
      lastName: (e.target as any).lastName.value,
      groupName: (e.target as any).groupName.value,
      role: (e.target as any).role.value,
      expectedSalary: (e.target as any).expectedSalary.value,
      expectedDateOfDefense: (e.target as any).expectedDateOfDefense.value,
    });

    if (!updateLoading) {
      setEditModal(false);
      setMember(null);
    }
  };

  const { mutate: addMember, isPending: addLoading } = useAddMember();

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addMember({
      firstName: (e.target as any).firstName.value,
      lastName: (e.target as any).lastName.value,
      groupName: (e.target as any).groupName.value,
      role: (e.target as any).role.value,
      expectedSalary: (e.target as any).expectedSalary.value,
      expectedDateOfDefense: (e.target as any).expectedDateOfDefense.value,
    });

    if (!addLoading) {
      setAddModal(false);
      setMember(null);
    }
  };

  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <NavBar />
      <MembersList
        setAddModal={setAddModal}
        setEditModal={setEditModal}
        setMember={setMember}
        addModal={addModal}
      />
      {addModal && (
        <MemberForm
          member={member!}
          handleSubmit={handleAdd}
          isLoading={addLoading}
        />
      )}
      {editModal && (
        <MemberForm
          member={member!}
          handleSubmit={handleUpdate}
          isLoading={updateLoading}
        />
      )}
    </div>
  );
};

export default MembersPage;
