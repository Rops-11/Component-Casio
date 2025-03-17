import { Employee } from "../../types/employee.types";
import EmployeeCard from "./EmployeeCard";
import EmployeeListHeader from "./EmployeeListHeader";

const EntryLevelEmployeesList = ({ employees }: { employees: Employee[] }) => {
  return (
    <div className="flex flex-col w-full h-full p-3 bg-gray-400 rounded border-2">
      <div className="flex justify-center items-center">
        <p className="text-2xl font-extrabold pb-2">Entry Level</p>
      </div>
      <EmployeeListHeader />
      <div className="flex flex-col h-39 overflow-y-scroll">
        {employees!.map(
          (employee) =>
            parseInt(employee.salary!) < 50000 && (
              <EmployeeCard employee={employee} />
            )
        )}
      </div>
    </div>
  );
};

export default EntryLevelEmployeesList;
