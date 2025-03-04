
const EmployeeListHeader = () => {
  return (
    <div className="flex p-3 w-full border rounded pr-7">
      <div className="flex w-1/3 h-auto text-xl font-medium">Name</div>
      <div className="flex w-1/3 h-auto text-xl font-medium">Role</div>
      <div className="flex w-1/3 h-auto text-xl font-medium">Salary</div>
    </div>
  );
};

export default EmployeeListHeader;
