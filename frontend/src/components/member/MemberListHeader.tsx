const MemberListHeader = () => {
  return (
    <div className="flex p-3 w-full border rounded pr-7 mt-3">
      <div className="flex w-1/6 text-lg text-center font-medium justify-center items-center">
        Name
      </div>
      <div className="flex w-1/6 text-lg text-center font-medium justify-center items-center">
        Group Name
      </div>
      <div className="flex w-1/6 text-lg text-center font-medium justify-center items-center">
        Role
      </div>
      <div className="flex w-1/6 text-lg text-center font-medium justify-center items-center">
        Expected Salary
      </div>
      <div className="flex w-1/6 text-lg text-center font-medium justify-center items-center">
        Expected Date of Defense
      </div>
      <div className="flex w-1/6 text-lg text-center font-medium justify-center items-center">
        Actions
      </div>
    </div>
  );
};

export default MemberListHeader;
