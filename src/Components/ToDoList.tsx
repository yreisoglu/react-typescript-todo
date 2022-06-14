import { Droppable } from "react-beautiful-dnd";
import { IoIosAdd } from "react-icons/io";
import ToDoItem from "./ToDoItem";
import React from "react";

interface ToDoList {
  todo: { id: string; name: string }[];
  id: string;
  color: any;
}

export const ToDoList: React.FC<ToDoList> = (props) => {
  return (
    <Droppable droppableId={props.id} key={props.id}>
      {(provided) => (
        <div className="todo h-full" {...provided.droppableProps} ref={provided.innerRef}>
          <div className="flex flex-col justify-between">
            {props.todo.map((item: any, index: number) => {
              return (
                <ToDoItem
                  content={item.content}
                  emoji={item.emoji}
                  id={item.id}
                  index={index}
                  key={item.id}
                  color={props.color}
                />
              );
            })}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default ToDoList;
