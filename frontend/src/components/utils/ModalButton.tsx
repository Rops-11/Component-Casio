interface Props {
  handleClick: () => void;
  text: string;
  className?: string;
}

const ModalButton = ({ handleClick, text, className }: Props) => {
  return (
    <button
      onClick={handleClick}
      className={className}>
      {text}
    </button>
  );
};

export default ModalButton;
