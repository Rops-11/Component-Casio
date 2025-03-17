import { Employee } from "../../types/employee.types";

interface Props {
  employee: Employee;
}

const EmployeeCard = ({ employee }: Props) => {
  console.log(employee);
  return (
    <div className="flex h-auto p-3 bg-gray-400 rounded border-2">
      <div className="flex w-1/3 h-auto">{employee.name}</div>
      <div className="flex w-1/3 h-auto">{employee.role}</div>
      <div className="flex w-1/3 h-auto">{employee.salary}</div>
    </div>
  );
};

export default EmployeeCard;
