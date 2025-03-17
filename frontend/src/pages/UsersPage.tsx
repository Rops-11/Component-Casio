import UsersList from "../components/users/UsersList";
import NavBar from "../components/utils/NavBar";

const UsersPage = () => {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <NavBar />
      <UsersList />
    </div>
  );
};

export default UsersPage;
