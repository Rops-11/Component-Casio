import React from "react";

const MemberListHeader = () => {
  return (
    <div className="flex p-3 w-full border rounded pr-7 mt-3">
      <div className="flex w-1/6 text-xl font-medium">Name</div>
      <div className="flex w-1/6 text-xl font-medium">Group Name</div>
      <div className="flex w-1/6 text-xl font-medium">Role</div>
      <div className="flex w-1/6 text-xl font-medium">Expected Salary</div>
      <div className="flex w-1/6 text-xl font-medium">
        Expected Date of Defense
      </div>
    </div>
  );
};

export default MemberListHeader;
