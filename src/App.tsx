import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import CenterScreen from "./Components/CenterScreen";
import CreateNewTodoZone from "./Components/CreateNewTodoZone";
import DeleteZone from "./Components/DeleteZone";
import useStore from "./store";
function App() {
  const store = useStore();
  const { toggleDragging, isDragging } = store;
  const [todo, setTodo] = useState({
    next: [],
    progress: [],
    complete: [],
  });

  const onDragEnd = (result: DropResult) => {
    toggleDragging();
    const { source, destination } = result;
    console.log(source, destination);

    if (!destination) return;
    if (destination.droppableId === "create") return;
    if (source.droppableId === "create" && destination.droppableId !== "delete") {
      console.log("create");
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
      console.log(todo);
    } else {
      const items = (todo as any)[destination.droppableId];
      const [newOrder] = items.splice(source.index, 1);
      items.splice(destination.index, 0, newOrder);
      setTodo({ ...todo, [destination.droppableId]: items });
    }
  };

  return (
    <div className="App grid grid-flow-col grid-cols-8 ">
      <DragDropContext onDragEnd={onDragEnd} onDragStart={toggleDragging}>
        <div className="col-span-1 w-full h-screen">
          <CreateNewTodoZone></CreateNewTodoZone>
        </div>
        <div className="col-span-6 flex justify-center w-full">
          <CenterScreen todo={todo}></CenterScreen>
        </div>
        <div className="col-span-1">
          <DeleteZone></DeleteZone>
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
