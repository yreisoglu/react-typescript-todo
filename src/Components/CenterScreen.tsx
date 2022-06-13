import { TiTick } from "react-icons/ti";
import { COLORS } from "../values/colors";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { ToDoList } from "./ToDoList";
import { useState } from "react";
import { ToDoHeader } from "./ToDoHeader";
import { v4 as uuidv4 } from "uuid";
import EmptyToDoItem from "./EmptyToDoItem";
import useStore from "../store";

const CenterScreen = (props: any) => {
  const [todo, setTodo] = useState(props.todo);
  const [isAddPanelOpen, toggleAddPanel] = useState(false);


  const addNewToDo = (header: string, content: string, chosenEmoji: string, date: Date) => {
    const items = (todo as any)[header];
    items.push({ id: uuidv4(), content: content, emoji: chosenEmoji, date: date });
    setTodo({ ...todo, [header]: items });
  };

  return (
    <div className="h-full p-2 w-2/3">
      <div className="flex justify-center items-center flex-col mb-2">
        <div className="font-bold text-4xl flex items-center">
          <TiTick /> To Do
        </div>
        <p className="font-light mb-8 ">
          Click <span className="bg-blue-100 font-medium text-blue-700 p-1 rounded-md">+</span> to
          create new list.
        </p>
      </div>
      <div className="grid grid-cols-3 space-x-4 w-full">
        <div>
          <ToDoHeader
            title="Next"
            itemCount={todo.next.length}
            color={COLORS.red}
            addToDo={() => toggleAddPanel(!isAddPanelOpen)}
          />
          {isAddPanelOpen && (
            <EmptyToDoItem
              insertTodo={(content: string, chosenEmoji: string, date: Date) =>
                addNewToDo("next", content, chosenEmoji, date)
              }
            ></EmptyToDoItem>
          )}
          <ToDoList id="next" todo={todo.next} color={COLORS.red}></ToDoList>
        </div>
        <div>
          <ToDoHeader
            title="In Progress"
            itemCount={todo.progress.length}
            color={COLORS.blue}
            addToDo={console.log}
          />
          <ToDoList id="progress" todo={todo.progress} color={COLORS.blue}></ToDoList>
        </div>
        <div>
          <ToDoHeader
            title="Complete"
            itemCount={todo.complete.length}
            color={COLORS.green}
            addToDo={console.log}
          />
          <ToDoList id="complete" todo={todo.complete} color={COLORS.green}></ToDoList>
        </div>
      </div>
    </div>
  );
};

export default CenterScreen;
