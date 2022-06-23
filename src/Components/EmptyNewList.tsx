import { useState } from "react";
import { IoMdArrowBack, IoMdArrowForward, IoMdDoneAll } from "react-icons/io";
import { COLORS } from "../values/colors";
import { toast } from "react-toastify";
const EmptyNewList = (props: any) => {
  const [title, setTitle] = useState("");
  const [selectedColor, setSelectedColor] = useState("rgb(139 92 246 / 1)");
  const [currentState, setCurrentState] = useState(0);
  const todoHeaders = JSON.parse(localStorage.getItem("todoHeaders") as string);
  const validation = () => {
    let isValid = true;
    if (!title) {
      toast.error("Fill the header title");
      isValid = false;
    }
    if (todoHeaders?.find((e: any) => e.name === title.toLowerCase())) {
      toast.error("The title has already been taken");
      isValid = false;
    }
    return isValid;
  };

  return (
    <div
      className="flex justify-around rounded-md px-3 py-2 items-center mb-3 transition-all duration-500 text-white"
      style={{ backgroundColor: selectedColor && selectedColor }}
    >
      <button
        disabled={currentState === 0}
        onClick={() => setCurrentState((currentState) => currentState - 1)}
      >
        <IoMdArrowBack></IoMdArrowBack>
      </button>

      {currentState === 0 && (
        <input
          className="bg-transparent placeholder-slate-200 text-white  font-semibold text-l text-center p-1 border-violet-300 rounded-sm "
          placeholder="Enter new fields title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      )}
      {currentState === 1 && (
        <select
          className="bg-transparent placeholder-slate-300 text-white  font-semibold text-l text-center p-1 border-violet-300 rounded-sm "
          onChange={(e) => setSelectedColor(e.target.value)}
        >
          <option hidden disabled selected>
            Choose a color
          </option>
          ;
          {Object.keys(COLORS).map((item) => {
            return (
              <option className="text-black" value={COLORS[item]}>
                {item.toLocaleUpperCase()}
              </option>
            );
          })}
        </select>
      )}
      {currentState !== 1 ? (
        <button
          disabled={currentState === 1}
          onClick={() => setCurrentState((currentState) => currentState + 1)}
        >
          <IoMdArrowForward></IoMdArrowForward>
        </button>
      ) : (
        <button
          onClick={() => {
            if (validation()) props.addNewHeader(title, selectedColor);
          }}
        >
          <IoMdDoneAll></IoMdDoneAll>
        </button>
      )}
    </div>
  );
};

export default EmptyNewList;
