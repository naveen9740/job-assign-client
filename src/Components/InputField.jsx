import { useRef } from "react";

export const InputField = ({ todo, setTodo, handleAdd }) => {
  const inputRef = useRef(null);
  return (
    <form
      className="input"
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter a Task"
        className="input__box"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button className="input__submit" type="submit">
        Add
      </button>
    </form>
  );
};
