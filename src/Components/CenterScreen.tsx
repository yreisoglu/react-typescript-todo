import { TiTick } from "react-icons/ti";
import { COLORS } from "../values/colors";
import { ToDoList } from "./ToDoList";
import { useState } from "react";
import { ToDoHeader } from "./ToDoHeader";
import { v4 as uuidv4 } from "uuid";
import EmptyToDoItem from "./EmptyToDoItem";
import { IoIosAdd } from "react-icons/io";
import AddButton from "./AddButton";
import camelCase from "camelcase";
import EmptyNewList from "./EmptyNewList";
import { MdEdit } from "react-icons/md";

const CenterScreen = (props: any) => {
  const [todo, setTodo] = useState(props.todo);
  const [isAddPanelOpen, toggleAddPanel] = useState(false);
  const [isNewListOpen, toggleNewList] = useState(false);
  const [todoHeaders, settodoHeaders] = useState(() => {
    const storedHeaders = JSON.parse(localStorage.getItem("todoHeaders") as string);
    return storedHeaders || [];
  });
  const addNewToDo = (header: string, content: string, chosenEmoji: string, date: Date) => {
    const items = (todo as any)[header];

    items.unshift({ id: uuidv4(), content: content, emoji: chosenEmoji, date: date });
    setTodo({ ...todo, [header]: items });
    localStorage.setItem("todo", JSON.stringify(todo));
  };

  const addNewHeader = (title: string, color: string) => {
    const header = { label: title, name: camelCase(title), color: color };
    todoHeaders.push(header);
    const todos = todo;
    todos[camelCase(title)] = [];
    setTodo({ ...todo, todos });
    localStorage.setItem("todo", JSON.stringify(todo));
    localStorage.setItem("todoHeaders", JSON.stringify(todoHeaders));
    toggleNewList(false);
  };

  const removeHeader = () => {};

  return (
    <div className="h-full p-2 w-2/3">
      <button className="absolute right-0 top-0">
        <MdEdit></MdEdit>
      </button>
      <div className="flex justify-center items-center flex-col mb-2">
        <div className="font-bold text-4xl flex items-center mb-2">
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
      <div className="flex justify-around lg:space-x-4 w-full">
        {todoHeaders &&
          todoHeaders.map((item: any) => {
            return (
              <div className="lg:mb-14 w-full">
                <ToDoHeader
                  title={item.label}
                  itemCount={todo[item.name].length}
                  color={item.color}
                  addToDo={() => toggleAddPanel(!isAddPanelOpen)}
                />
                {isAddPanelOpen && item.label === "Next" && (
                  <EmptyToDoItem
                    insertTodo={(content: string, chosenEmoji: string, date: Date) => {
                      addNewToDo("next", content, chosenEmoji, date);
                      toggleAddPanel(false);
                    }}
                  ></EmptyToDoItem>
                )}
                <ToDoList id={item.name} todo={todo[item.name]} color={item.color}></ToDoList>
              </div>
            );
          })}
        {todoHeaders.length < 6 && (
          <div className="h-auto w-full">
            {isNewListOpen ? (
              <EmptyNewList addNewHeader={addNewHeader}></EmptyNewList>
            ) : (
              <AddButton
                className="p-3 bg-violet-500 text-white"
                onClick={() => {
                  toggleNewList(true);
                }}
              ></AddButton>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CenterScreen;
