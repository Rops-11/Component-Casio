import { useEffect, useState } from "react";
import { User } from "../types/user.types";
import { Member } from "../types/member.types";
import { Employee } from "../types/employee.types";

const useSearch = (entries: User[] | Member[] | Employee[]) => {
  const [inputValue, setInputValue] = useState<string>();
  const [filteredEntries, setFilteredEntries] = useState<
    User[] | Member[] | Employee[]
  >(entries!);

  useEffect(() => {
    if (inputValue) {
      const isUserArray = entries.length > 0 && "name" in entries[0];
      const isMemberArray = entries.length > 0 && "firstName" in entries[0];
      const isEmployeeArray = entries.length > 0 && "firstName" in entries[0];

      if (isUserArray) {
        const newEntries = entries.filter(
          (entry) => "name" in entry && entry.name?.includes(inputValue)
        );

        setFilteredEntries(newEntries);
      } else if (isMemberArray) {
        const newEntries = entries.filter(
          (entry) =>
            "firstName" in entry && entry.firstName?.includes(inputValue)
        );

        setFilteredEntries(newEntries);
      } else if (isEmployeeArray) {
        const newEntries = entries.filter(
          (entry) =>
            "firstName" in entry && entry.firstName?.includes(inputValue)
        );

        setFilteredEntries(newEntries);
      }
    } else {
      setFilteredEntries(entries!);
    }
  }, [inputValue, entries]);

  return { inputValue, setInputValue, filteredEntries, setFilteredEntries };
};

export default useSearch;
