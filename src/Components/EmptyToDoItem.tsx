import { Picker } from "emoji-mart";
import { useEffect, useRef, useState } from "react";
import data from "@emoji-mart/data";

const EmojiPicker = (props: any) => {
  const ref: any = useRef();

  useEffect(() => {
    new Picker({ ...props, data, ref });
  }, []);

  return <div ref={ref} />;
};

const EmptyToDoItem = (props: any) => {
  const [openEmoji, toggleEmoji] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState("🎉");
  const [content, setContent] = useState("");
  const [date, setDate] = useState<string>();
  console.log(props);
  return (
    <div className="bg-white rounded-lg py-2 px-4 my-2 h-48 flex justify-around flex-col w-auto max-h-min border-dashed border-2 border-gray-300">
      <div className="flex justify-between items-center mb-2">
        <button className="text-xl bg-gray-100 rounded-full p-2" onClick={() => toggleEmoji(true)}>
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
      <input
        className="outline-none border-2 p-2 focus:border-transparent rounded-md"
        placeholder="You can write here!"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex justify-between">
        <button onClick={() => props.insertTodo(content, chosenEmoji, date)}>✅</button>

        <input
          type="date"
          name=""
          id=""
          placeholder="Enter end Date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>
    </div>
  );
};
export default EmptyToDoItem
