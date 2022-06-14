import { IoIosAdd } from "react-icons/io";
import React from "react";

export interface IHeaders {
  title: string;
  itemCount: number;
  color: string;
  addToDo: any;
}
export const ToDoHeader: React.FC<IHeaders> = ({ title, itemCount, color, addToDo }) => {
  return (
    <div
      className="flex justify-between rounded-md px-3 py-2 items-center mb-3"
      style={{ backgroundColor: color }}
    >
      {title === "Next" ? (
        <button
          onClick={() => {
            addToDo();
          }}
          className="font-semibold p-1 rounded-md bg-white text-2xl"
          style={{ color: color }}
        >
          <IoIosAdd></IoIosAdd>
        </button>
      ) : (
        <div></div>
      )}

      <div className="text-white font-semibold text-l">{title}</div>
      <div
        className="bg-white w-8 h-8 items-center flex justify-center rounded-md font-semibold"
        style={{ color: color }}
      >
        {itemCount}
      </div>
    </div>
  );
};
