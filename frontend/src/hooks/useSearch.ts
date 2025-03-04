import React, { useEffect, useState } from "react";
import { User } from "../types/user.types";

const useSearch = (users: User[]) => {
  const [inputValue, setInputValue] = useState<string>();
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users!);

  useEffect(() => {
    if (inputValue) {
      const newUsers = users!.filter((user) => user.name!.includes(inputValue));
      setFilteredUsers(newUsers);
    } else {
      setFilteredUsers(users!);
    }
  }, [inputValue, users]);

  return { inputValue, setInputValue, filteredUsers, setFilteredUsers };
};

export default useSearch;
