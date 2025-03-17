import UserCard from "./UserCard";
import SearchBar from "../utils/SearchBar";
import useGetUsers from "../../hooks/useGetUsers";
import useSearch from "../../hooks/useSearch";

const UsersList = () => {
  const { data: users, loading } = useGetUsers();
  const { inputValue, setInputValue, filteredEntries } = useSearch(users!);
  return (
    <div className="flex flex-col w-full h-screen justify-center items-center">
      <div
        id="container"
        className="flex w-4/5 h-4/5 flex-col bg-green-500 rounded border-2">
        <div className="flex flex-col w-full h-auto mt-5 justify-center items-center space-y-2">
          <p className="text-[4rem] font-extrabold font-serif">Users</p>
          <SearchBar
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
        </div>
        {loading ? (
          <div className="flex items-center justify-center text-xl my-10">
            Loading...
          </div>
        ) : (
          <div
            id="list"
            className="flex flex-col overflow-auto items-center my-10">
            {filteredEntries &&
              filteredEntries.map((entry) => {
                return (
                  <UserCard
                    key={entry.id}
                    user={entry}
                  />
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersList;
