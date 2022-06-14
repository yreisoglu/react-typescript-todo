import { Picker } from "emoji-mart";
import { useEffect, useRef, useState } from "react";
import data from "@emoji-mart/data";
import { toast } from "react-toastify";
import { IoIosAdd } from "react-icons/io";
import AddButton from "./AddButton";

const EmojiPicker = (props: any) => {
  const ref: any = useRef();

  useEffect(() => {
    new Picker({ ...props, data, ref, theme: "light" });
  }, []);

  return <div className="absolute mt-10" ref={ref} />;
};

const EmptyToDoItem = (props: any) => {
  const [openEmoji, toggleEmoji] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState("🔍");
  const [content, setContent] = useState("");
  const [date, setDate] = useState<string>();
  const checkValidation = () => {
    let isValid = true;
    if (content.length > 74) {
      toast.error("Task is too long");
      isValid = false;
    }
    if (!content) {
      toast.error("Fill the task field");
      isValid = false;
    }
    return isValid;
  };

  return (
    <div className="bg-slate-50 rounded-lg py-2 px-4 my-2 h-48 flex justify-around flex-col w-auto max-h-min border-dashed border-2 border-gray-300">
      <div className="flex justify-center mb-2">
        <button
          className="text-xl bg-slate-200 rounded-full p-2"
          onClick={() => {
            toggleEmoji(!openEmoji);
          }}
        >
          {chosenEmoji}
        </button>
        {openEmoji && (
          <EmojiPicker
            onEmojiSelect={(res: any) => {
              setChosenEmoji(res.native);
              toggleEmoji(false);
            }}
          />
        )}
      </div>
      <div className="flex justify-between">
        <input
          className="outline-none border-2 p-2 focus:border-transparent rounded-md bg-slate-200 text-center"
          placeholder="Write your task!"
          value={content}
          name="content"
          onChange={(e) => setContent(e.target.value)}
        />
        <AddButton
          className=""
          onClick={() => {
            const isValid = checkValidation();
            if (isValid) {
              props.insertTodo(content, chosenEmoji, date);
            }
          }}
        ></AddButton>
      </div>
    </div>
  );
};
export default EmptyToDoItem;
