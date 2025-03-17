const DeleteButton = ({ deleteFunction }: { deleteFunction: () => void }) => {
  return (
    <button
      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
      onClick={deleteFunction}>
      Delete
    </button>
  );
};

export default DeleteButton;
