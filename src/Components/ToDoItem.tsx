import { Draggable } from "react-beautiful-dnd";
import { BsClock, BsThreeDots } from "react-icons/bs";
import React from "react";
import useStore from "../store";

type IToDoItem = {
  content: string;
  emoji: string;
  id: string;
  index: number;
  color: any;
};
export const getItemStyle = (isDragging: boolean, draggableStyle: any, color: any) => ({
  opacity: isDragging ? "0.1" : "1",
  background: isDragging ? "#efd4ff" : draggableStyle.background,
  border: isDragging && "1px solid #2E0249",
  borderColor: isDragging ? "#2E0249" : "transparent",
  ...draggableStyle,
});
const ToDoItem: React.FC<IToDoItem> = (props) => {
  return (
    <Draggable key={props.id} draggableId={props.id} index={props.index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(snapshot.isDragging, provided.draggableProps.style, props.color)}
          className="bg-slate-50 rounded-lg py-2 px-4 max-h-min my-2 h-auto  flex justify-around flex-col shadow-md w-auto"
        >
          <div className="flex justify-center items-center mb-2">
            <div className="text-2xl rounded-full p-2 bg-slate-200 flex items-center justify-center">
              {props.emoji}
            </div>
          </div>
          <p className="break-all mb-2 font-semibold text-center">{props.content}</p>
        </div>
      )}
    </Draggable>
  );
};
export default ToDoItem;
