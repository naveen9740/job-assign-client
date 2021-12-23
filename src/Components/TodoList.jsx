import { Droppable } from "react-beautiful-dnd";
import { SingleTodo } from ".";

export const TodoList = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}) => {
  return (
    <div className="container">
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Active Tasks</span>
            {todos?.map((todo, index) => {
              return (
                <SingleTodo
                  index={index}
                  key={index}
                  todo={todo}
                  todos={todos}
                  setTodos={setTodos}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div
            className={`todos remove ${
              snapshot.isDraggingOver ? "dragcomplete" : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Completed Tasks</span>
            {completedTodos.map((todo, index) => {
              return (
                <SingleTodo
                  index={index}
                  key={index}
                  todo={todo}
                  todos={completedTodos}
                  setTodos={setCompletedTodos}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
