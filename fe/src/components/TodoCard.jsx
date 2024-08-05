import Input from "./Input";
import { useState, useEffect } from "react";
import axios from "axios";
import TodoList from "./TodoList";
import Buttons from "./Buttons";

function TodoCard() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        "https://fm-todo-app-backend.onrender.com",
      );
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const leftTodos = todos.filter((todo) => todo.completed === false);

  const clearCompleted = async () => {
    try {
      const response = await axios.delete(
        "https://fm-todo-app-backend.onrender.com/completed",
      );
      console.log("Completed todos cleared:", response.data);
      fetchTodos();
    } catch (error) {
      console.error("Error clearing completed todos:", error);
    }
  };

  return (
    <div className="relative mx-auto w-2/3 max-w-[540px] z-10">
      <Input todos={todos} setTodos={setTodos} />
      <div className="mt-4 sm:mt-6 bg-white rounded-[5px] dark:bg-darkTheme-veryDarkDesaturatedBlue shadow-xl ">
        <TodoList
          filter={filter}
          setFilter={setFilter}
          todos={todos}
          setTodos={setTodos}
          fetchTodos={fetchTodos}
        />
        <div className="w-full text-[14px]  text-lightTheme-darkGrayishBlue dark:text-darkTheme-darkGrayishBlue bg-transparent  px-5 py-3  sm:p-6 sm:py-5 flex items-center justify-between ">
          <p>{leftTodos.length} items left</p>
          <div className="hidden sm:flex">
            <Buttons filter={filter} setFilter={setFilter} />
          </div>
          <button
            onClick={clearCompleted}
            className="hover:text-lightTheme-veryDarkGrayishBlue dark:hover:text-darkTheme-lightGrayishBlueHover"
          >
            Clear Completed
          </button>
        </div>
      </div>
      <div className="flex justify-center sm:hidden mt-4 bg-white rounded-[5px] py-4  drop-shadow-xl dark:bg-darkTheme-veryDarkDesaturatedBlue">
        <Buttons filter={filter} setFilter={setFilter} />
      </div>
      <button className="block mt-10 sm:mt-12 mx-auto text-[14px] text-lightTheme-darkGrayishBlue dark:text-darkTheme-darkGrayishBlue">
        Drag and drop to reorder list
      </button>
    </div>
  );
}

export default TodoCard;
