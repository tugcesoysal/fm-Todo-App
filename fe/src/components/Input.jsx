import { useState } from "react";
import axios from "axios";

function Input({ todos, setTodos }) {
  const [newTodo, setNewTodo] = useState("");

  const addTodo = async (event) => {
    if (event.key === "Enter") {
      if (!newTodo.trim()) {
        return;
      }

      try {
        const response = await axios.post(
          "https://fm-todo-app-backend.onrender.com",
          {
            todo: newTodo,
          },
        );
        setTodos([
          ...todos,
          {
            todo: newTodo,
            completed: false,
            _id: response.data._id,
          },
        ]);
        setNewTodo("");
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    }
  };
  return (
    <div className="w-full cursor-pointer bg-white rounded-[5px] pl-5 py-3 gap-3 sm:pl-6 sm:py-5 flex items-center  sm:gap-6 dark:bg-darkTheme-veryDarkDesaturatedBlue shadow-xl">
      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-lightTheme-veryLightGrayishBlue dark:border-darkTheme-veryDarkGrayishBlue1 cursor-pointer"></div>
      <input
        className=" text-lightTheme-veryDarkGrayishBlue placeholder-lightTheme-darkGrayishBlue dark:text-darkTheme-lightGrayishBlue dark:placeholder-darkTheme-darkGrayishBlue  outline-none bg-transparent cursor-pointer"
        type="text"
        placeholder="Create a new todo.."
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyDown={addTodo}
      />
    </div>
  );
}

export default Input;
