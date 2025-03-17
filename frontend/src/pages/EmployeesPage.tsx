import NavBar from "../components/utils/NavBar";
import EmployeesContainer from "../components/employee/EmployeesContainer";

const EmployeesPage = () => {
  return (
    <div className="flex flex-col w-full h-auto items-center justify-center">
      <NavBar />
      <EmployeesContainer />
    </div>
  );
};

export default EmployeesPage;
