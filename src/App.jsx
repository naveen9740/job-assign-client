import { useState } from "react";
import "./App.css";
import { InputField, TodoList } from "./Components";
import { DragDropContext } from "react-beautiful-dnd";
import axios from "axios";
import { useEffect } from "react";

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);

  useEffect(() => {
    (async () => {
      const tasks = await axios.get(
        "https://job-assignment1.herokuapp.com/get"
      );
      setTodos(tasks?.data?.message);
    })();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      if (todo) {
        setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }]);
        setTodo("");
        await axios.post("https://job-assignment1.herokuapp.com/add", {
          todo: todo,
        });
      }
    } catch (error) {
      console.log("Please Type something in Input Field");
    }
  };
  const onDragEnd = (result) => {
    console.log(result);
    const { source, destination } = result;
    if (destination === null) return;
    if (
      destination.dropableId === source.dropableId &&
      destination.index === source.index
    )
      return;
    let add,
      active = todos,
      complete = completedTodos;
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }
    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }
    setCompletedTodos(complete);
    setTodos(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="app">
        <span className="heading">App</span>

        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />

        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
        <a href="https://github.com/naveen9740/job-assign-server">
          Backend Github Link
        </a>
      </div>
    </DragDropContext>
  );
};

export default App;
