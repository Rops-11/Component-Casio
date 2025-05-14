import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex justify-between items-center p-4 bg-gray-800">
      <button
        onClick={() => {
          navigate("/");
        }}
        className="text-white text-2xl font-bold">
        Component Casio
      </button>
      <div className="space-x-4">
        <button
          onClick={() => {
            navigate("/users");
          }}
          className="text-white hover:text-gray-300">
          Users
        </button>
        <button
          onClick={() => {
            navigate("/employees");
          }}
          className="text-white hover:text-gray-300">
          Employees
        </button>
        <button
          onClick={() => {
            navigate("/members");
          }}
          className="text-white hover:text-gray-300">
          Members
        </button>
        <button
          onClick={() => {
            navigate("/todo");
          }}
          className="text-white hover:text-gray-300">
          Tasks
        </button>
      </div>
    </div>
  );
};

export default NavBar;
