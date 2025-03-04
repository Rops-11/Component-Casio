import { User } from "../types/user.types";

interface Props {
  user: User;
}

const UserCard = ({ user }: Props) => {
  return (
    <div className="flex w-11/12 h-auto p-3 bg-gray-400 rounded border-2">
      {user.name}
    </div>
  );
};

export default UserCard;
