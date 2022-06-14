import { IoIosAdd } from "react-icons/io";

interface Props {
  onClick: () => void;
  className: string;
}

const AddButton: React.FC<Props> = (props) => {
  return (
    <button
      className={"font-semibold p-1 rounded-md bg-white text-2xl " + props.className}
      onClick={props.onClick}
    >
      <IoIosAdd></IoIosAdd>
    </button>
  );
};

export default AddButton;
