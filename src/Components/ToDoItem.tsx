import { Draggable } from "react-beautiful-dnd";
import { BsClock, BsThreeDots } from "react-icons/bs";
import React from "react";

type IToDoItem = {
  content: string;
  date: Date;
  emoji: string;
  id: string;
  index: number;
  color: any;
};

const getItemStyle = (isDragging: boolean, draggableStyle: any, color: any) => ({
  background: isDragging ? "rgb(107 114 128)" : "white",
  color: isDragging ? "white" : "black",
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
          className="bg-white rounded-lg py-2 px-4 max-h-min my-2 h-48 flex justify-around flex-col shadow-md w-auto"
        >
          <div className="flex justify-between items-center mb-2">
            <div className="text-xl bg-gray-100 rounded-full p-1">{props.emoji}</div>
            <BsThreeDots onClick={() => console.log("asdf")} className="text-xl"></BsThreeDots>
          </div>
          <p className="break-all mb-2">{props.content}</p>
          <div className="flex justify-end">
            <div className="flex items-center bg-orange-500 p-1 text-white rounded-lg">
              <BsClock className="mr-1"></BsClock>
              {`${props.date}` || null}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};
export default ToDoItem;
