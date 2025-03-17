import useGetMembers from "../../hooks/useGetMembers";
import MemberCard from "./MemberCard";
import useSearch from "../../hooks/useSearch";
import SearchBar from "../utils/SearchBar";
import { Member } from "../../types/member.types";
import ModalButton from "../utils/ModalButton";
import MemberListHeader from "./MemberListHeader";
const MembersList = ({
  setAddModal,
  setEditModal,
  addModal,
  setMember,
}: {
  setAddModal: (modal: boolean) => void;
  setEditModal: (modal: boolean) => void;
  addModal: boolean;
  setMember: (member: Member) => void;
}) => {
  const { data: members, isLoading, error } = useGetMembers();
  const { inputValue, setInputValue, filteredEntries } = useSearch(members!);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center">
      <div
        id="container"
        className="flex w-4/5 h-4/5 flex-col bg-green-500 rounded border-2 p-3">
        <div className="flex flex-col w-full h-auto mt-5 justify-center items-center space-y-2">
          <p className="text-[4rem] font-extrabold font-serif">Members</p>
          <div className="flex w-full h-auto justify-between items-center space-x-2">
            <SearchBar
              inputValue={inputValue}
              setInputValue={setInputValue}
            />
            <ModalButton
              handleClick={() => setAddModal(!addModal)}
              text="Add Member"
              className="flex justify-center items-center w-1/5 h-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
            />
          </div>
        </div>
        <MemberListHeader />
        {isLoading || !filteredEntries ? (
          <div className="flex items-center justify-center text-xl my-10">
            Loading...
          </div>
        ) : (
          <div
            id="list"
            className="flex flex-col overflow-auto items-center">
            {filteredEntries.length > 0 ? (
              filteredEntries.map((entry) => (
                <MemberCard
                  key={entry.id}
                  member={entry as Member}
                  setEditModal={setEditModal}
                  setMember={setMember}
                />
              ))
            ) : (
              <div className="flex items-center justify-center text-xl my-10">
                No members found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MembersList;
