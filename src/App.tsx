import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import CenterScreen from "./Components/CenterScreen";
import DeleteZone from "./Components/DeleteZone";
import useStore from "./store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const store = useStore();
  const { toggleDragging, isDragging } = store;
  const [todo, setTodo] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("todo") as string);
    return saved || {};
  });
  
  const onDragEnd = (result: DropResult) => {
    toggleDragging();
    const { source, destination } = result;
    console.log(source, destination);
    if (!destination) return;
    if (destination.droppableId === "create") return;
    if (source.droppableId === "create" && destination.droppableId !== "delete") {
    } else if (
      source.droppableId !== destination.droppableId &&
      destination.droppableId !== "delete"
    ) {
      const sourceArray: [] = (todo as any)[source.droppableId];
      const destinationArray: [] = (todo as any)[destination.droppableId];
      const [item] = sourceArray.splice(source.index, 1);
      destinationArray.splice(destination.index, 0, item);
      setTodo({
        ...todo,
        [destination.droppableId]: destinationArray,
        [source.droppableId]: sourceArray,
      });
    } else if (destination.droppableId === "delete") {
      const sourceArray: [] = (todo as any)[source.droppableId];
      sourceArray.splice(source.index, 1);
      setTodo({
        ...todo,
        [source.droppableId]: sourceArray,
      });
    } else {
      const items = (todo as any)[destination.droppableId];
      const [newOrder] = items.splice(source.index, 1);
      items.splice(destination.index, 0, newOrder);
      setTodo({ ...todo, [destination.droppableId]: items });
    }
    localStorage.setItem("todo", JSON.stringify(todo));
  };

  return (
    <div>
      <ToastContainer autoClose={1500}></ToastContainer>

      <DragDropContext onDragEnd={onDragEnd} onDragStart={toggleDragging}>
        <div className="col-span-7 flex justify-center w-full">
          <CenterScreen todo={todo}></CenterScreen>
        </div>
        <DeleteZone></DeleteZone>
      </DragDropContext>
    </div>
  );
}

export default App;
