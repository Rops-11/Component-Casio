import React from "react";
import { Member } from "../../types/member.types";

interface Props {
  member: Member;
  isLoading: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const MemberForm = ({ member, handleSubmit, isLoading }: Props) => {

  return (
    <div className="flex flex-col w-full h-full items-center justify-center absolute top-0 left-0 bg-black/50">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-11/12 h-auto bg-white rounded-md p-4 space-y-2">
        <label htmlFor="firstName">First Name</label>
        <input
          className="border-2 border-gray-300 rounded-md p-2"
          name="firstName"
          type="text"
          placeholder="First Name"
          defaultValue={member?.firstName}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          className="border-2 border-gray-300 rounded-md p-2"
          name="lastName"
          type="text"
          placeholder="Last Name"
          defaultValue={member?.lastName}
        />
        <label htmlFor="groupName">Group Name</label>
        <input
          className="border-2 border-gray-300 rounded-md p-2"
          name="groupName"
          type="text"
          placeholder="Group Name"
          defaultValue={member?.groupName}
        />
        <label htmlFor="role">Role</label>
        <input
          className="border-2 border-gray-300 rounded-md p-2"
          name="role"
          type="text"
          placeholder="Role"
          defaultValue={member?.role}
        />
        <label htmlFor="expectedSalary">Expected Salary</label>
        <input
          className="border-2 border-gray-300 rounded-md p-2"
          name="expectedSalary"
          type="text"
          placeholder="Expected Salary"
          defaultValue={member?.expectedSalary}
        />
        <label htmlFor="expectedDateOfDefense">Expected Date of Defense</label>
        <input
          className="border-2 border-gray-300 rounded-md p-2"
          name="expectedDateOfDefense"
          type="date"
          placeholder="Expected Date of Defense"
          defaultValue={member?.expectedDateOfDefense}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md">
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default MemberForm;
