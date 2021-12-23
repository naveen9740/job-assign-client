import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";

export const SingleTodo = ({ todo, todos, setTodos, index }) => {
  const [edit, setEdit] = useState(false);
  const [editTodo, setEditTodo] = useState(todo?.todo);
  const [editCount, setEditCount] = useState(0);

  const handleDone = (id) => {
    setTodos(
      todos.map((todo) =>
        todo._id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };
  const handleDelete = async (id) => {
    setTodos(todos.filter((todo) => todo._id !== id));
    try {
      await axios.delete(`https://job-assignment1.herokuapp.com/${id}`);
    } catch (error) {
      console.log("cannot Delete :(", error.message);
    }
  };
  const handleEdit = async (e, id) => {
    e.preventDefault();
    console.log(id);
    try {
      setTodos(
        todos.map((todo) =>
          todo._id === id ? { ...todo, todo: editTodo } : todo
        )
      );
      await axios.put(`https://job-assignment1.herokuapp.com/${id}`, {
        todo: editTodo,
        editCount: editCount + 1,
      });
      setEditCount(editCount + 1);
      setEdit(false);
    } catch (error) {
      console.log("Cannot Edit :(", error.message);
    }
  };
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <Draggable draggableId={todo?._id?.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
          onSubmit={(e) => handleEdit(e, todo?._id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <input
              type="text"
              value={editTodo}
              ref={inputRef}
              onChange={(e) => setEditTodo(e.target.value)}
              className="todos__single--text"
            />
          ) : todo?.isDone ? (
            <s className="todos__single--text">{todo.todo}</s>
          ) : (
            <span className="todos__single--text">{todo.todo}</span>
          )}
          <div>EditApiCalled:{editCount}</div>
          <div>
            <span className="icon">
              <AiFillEdit
                onClick={() => {
                  if (!edit && !todo?.isDone) {
                    setEdit(!edit);
                  }
                }}
              />
            </span>
            <span className="icon">
              <AiFillDelete onClick={() => handleDelete(todo._id)} />
            </span>
            <span className="icon" onClick={() => handleDone(todo._id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};
