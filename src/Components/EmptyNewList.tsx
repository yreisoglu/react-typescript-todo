import { useState } from "react";
import { IoMdArrowBack, IoMdArrowForward, IoMdDoneAll } from "react-icons/io";
import { COLORS } from "../values/colors";

const EmptyNewList = (props: any) => {
  const [title, setTitle] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [currentState, setCurrentState] = useState(0);
  return (
    <div
      className="flex justify-around rounded-md px-3 py-2 items-center mb-3 bg-violet-500 transition-all duration-500 text-white"
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
        <button onClick={() => props.addNewHeader(title, selectedColor)}>
          <IoMdDoneAll></IoMdDoneAll>
        </button>
      )}
    </div>
  );
};

export default EmptyNewList;
