import React from "react";
import axios from "axios";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function TodoList({ todos, filter, setTodos, fetchTodos }) {
  const updateTodoCompletion = async (id) => {
    const updatedTodos = [...todos];
    const index = updatedTodos.findIndex((todo) => todo._id === id);
    if (index !== -1) {
      updatedTodos[index].completed = !updatedTodos[index].completed;

      try {
        await axios.put(`http://localhost:5555/${id}`, {
          completed: updatedTodos[index].completed,
        });
        setTodos(updatedTodos);
      } catch (error) {
        console.error("Error updating todo:", error);
      }
    }
  };

  const handleOnDragEnd = async (result) => {
    if (!result.destination) return;

    const updatedTodos = Array.from(filteredTodos);
    const [movedTodo] = updatedTodos.splice(result.source.index, 1);
    updatedTodos.splice(result.destination.index, 0, movedTodo);

    updatedTodos.forEach((todo, index) => {
      todo.order = index;
    });

    setTodos(updatedTodos);

    try {
      for (const todo of updatedTodos) {
        await axios.patch(`http://localhost:5555/${todo._id}`, {
          order: todo.order,
        });
      }
      fetchTodos();
    } catch (error) {
      console.error(
        "Error updating todo order:",
        error.response?.data || error.message,
      );
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "All") {
      return true;
    } else if (filter === "Completed") {
      return todo.completed === true;
    } else if (filter === "Active") {
      return todo.completed === false;
    }
    return true;
  });

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="todos-list">
        {(provided) => (
          <div
            className="min-h-[40px] "
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {filteredTodos.map((todo, index) => (
              <Draggable
                key={todo._id.toString()}
                draggableId={todo._id.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={() => updateTodoCompletion(todo._id)}
                    className={`select-none border-b border-lightTheme-veryLightGrayishBlue dark:border-darkTheme-veryDarkGrayishBlue1 w-full cursor-pointer bg-transparent pl-5 py-3 gap-3 sm:pl-6 sm:py-5 flex items-center sm:gap-6 ${
                      todo.completed ? "opacity-50" : ""
                    }`}
                  >
                    <div
                      className={`${
                        todo.completed ? "bg-check-gradient" : ""
                      } w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-lightTheme-veryLightGrayishBlue dark:border-darkTheme-veryDarkGrayishBlue1 cursor-pointer flex items-center justify-center`}
                    >
                      {todo.completed && (
                        <img src="/images/icon-check.svg" alt="check icon" />
                      )}
                    </div>
                    <p
                      className={`${
                        todo.completed
                          ? "text-lightTheme-lightGrayishBlue dark:text-darkTheme-veryDarkGrayishBlue1 line-through"
                          : ""
                      } text-lightTheme-veryDarkGrayishBlue dark:text-darkTheme-lightGrayishBlue`}
                    >
                      {todo.todo}
                    </p>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default TodoList;
