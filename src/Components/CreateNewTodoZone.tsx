import { Droppable } from "react-beautiful-dnd";
import useStore from "../store";
import ToDoItem from "./ToDoItem";

const CreateNewTodoZone = (props: any) => {
  const store = useStore();
  const { emptyItem, setEmptyItem } = store;
  return (
    <Droppable droppableId="create" key={props.id}>
      {(provided) => (
        <div className="create w-full h-full flex items-center justify-center p-3 bg-violet-100" {...provided.droppableProps} ref={provided.innerRef}>
          {provided.placeholder}
          <ToDoItem
            color={"green"}
            content=""
            date={new Date()}
            emoji=""
            id={"asfasdfsakflnasdjkf"}
            index={0}
          ></ToDoItem>
        </div>
      )}
    </Droppable>
  );
};
export default CreateNewTodoZone;
