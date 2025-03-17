import EmployeeCard from "./EmployeeCard";
import { Employee } from "../../types/employee.types";
import EmployeeListHeader from "./EmployeeListHeader";

const AllEmployeesList = ({ employees }: { employees: Employee[] }) => {
  return (
    <div className="flex flex-col w-full h-full p-3 bg-gray-400 rounded border-2">
      <div className="flex justify-center items-center">
        <p className="text-2xl font-extrabold pb-2">All Employees</p>
      </div>
      <EmployeeListHeader />
      <div className="flex flex-col h-39 overflow-y-scroll">
        {employees!.map((employee) => (
          <EmployeeCard employee={employee} />
        ))}
      </div>
    </div>
  );
};

export default AllEmployeesList;
