import { TiTick } from "react-icons/ti";
import { COLORS } from "../values/colors";
import { ToDoList } from "./ToDoList";
import { useState } from "react";
import { ToDoHeader } from "./ToDoHeader";
import { v4 as uuidv4 } from "uuid";
import EmptyToDoItem from "./EmptyToDoItem";
import { IoIosAdd } from "react-icons/io";

const CenterScreen = (props: any) => {
  const [todo, setTodo] = useState(props.todo);
  const [isAddPanelOpen, toggleAddPanel] = useState(false);

  const addNewToDo = (header: string, content: string, chosenEmoji: string, date: Date) => {
    const items = (todo as any)[header];

    items.unshift({ id: uuidv4(), content: content, emoji: chosenEmoji, date: date });
    setTodo({ ...todo, [header]: items });
    localStorage.setItem("todo", JSON.stringify(todo));
  };

  return (
    <div className="h-full p-2 w-2/3">
      <div className="flex justify-center items-center flex-col mb-2">
        <div className="font-bold text-4xl flex items-center mb-2" >
          <TiTick /> To Do
        </div>
        <p className="font-light  mb-8 flex items-center">
          Click{" "}
          <div
            className="flex p-1 mx-2 self-center rounded-md text-center items-center justify-center text-l bg-white  font-semibold  text-2xl"
            style={{
              color: COLORS.red,
            }}
          >
            <IoIosAdd className="inline"></IoIosAdd>
          </div>{" "}
          to create new task.
        </p>
      </div>
      <div className="xl:grid xl:grid-cols-3 lg:space-x-4  w-full">
        <div className="lg:mb-14">
          <ToDoHeader
            title="Next"
            itemCount={todo.next.length}
            color={COLORS.red}
            addToDo={() => toggleAddPanel(!isAddPanelOpen)}
          />
          {isAddPanelOpen && (
            <EmptyToDoItem
              insertTodo={(content: string, chosenEmoji: string, date: Date) => {
                addNewToDo("next", content, chosenEmoji, date);
                toggleAddPanel(false);
              }}
            ></EmptyToDoItem>
          )}
          <ToDoList id="next" todo={todo.next} color={COLORS.red}></ToDoList>
        </div>
        <div className="lg:mb-14">
          <ToDoHeader
            title="In Progress"
            itemCount={todo.progress.length}
            color={COLORS.blue}
            addToDo={console.log}
          />
          <ToDoList id="progress" todo={todo.progress} color={COLORS.blue}></ToDoList>
        </div>
        <div className="lg:mb-14">
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
