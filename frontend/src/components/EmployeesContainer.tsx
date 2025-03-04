import useGetEmployees from "../hooks/useGetEmployees";
import AllEmployeesList from "./AllEmployeesList";
import EntryLevelEmployeesList from "./EntryLevelEmployeesList";
import SeniorEmployeesList from "./SeniorEmployeesList";

const EmployeesContainer = () => {
  const { data: employees, loading } = useGetEmployees();
  return (
    <div className="flex flex-col w-full h-screen justify-center items-center">
      <div
        id="container"
        className="flex w-4/5 h-auto flex-col bg-green-500 p-3 rounded border-2">
        <div className="flex flex-col w-full h-auto mt-5 justify-center items-center space-y-2">
          <p className="text-[4rem] font-extrabold font-serif">Employees</p>
        </div>
        {loading ? (
          <div className="flex items-center justify-center text-xl my-10">
            Loading...
          </div>
        ) : (
          <div className="flex flex-col w-full h-full space-y-2">
            <AllEmployeesList employees={employees!} />
            <div className="flex w-full h-full space-x-5">
              <EntryLevelEmployeesList employees={employees!} />
              <SeniorEmployeesList employees={employees!} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeesContainer;
