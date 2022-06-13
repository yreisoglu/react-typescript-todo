import { DragDropContext, Droppable } from "react-beautiful-dnd";
import useStore from "../store";
import { MdDelete } from "react-icons/md";
const DeleteZone = (props: any) => {
  const store = useStore();
  const { isDragging } = store;
  return (
    <Droppable droppableId="delete" key={props.id}>
      {(provided) => (
        <div className="delete w-full h-full" {...provided.droppableProps} ref={provided.innerRef}>
          {isDragging && (
            <div className="h-screen w-full bg-red-200 flex items-center justify-center hover:p-4 text-4xl ">
              <MdDelete className="text-red-500 "></MdDelete>
            </div>
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
export default DeleteZone;
