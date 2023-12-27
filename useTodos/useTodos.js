import { useEffect, useReducer } from "react";

import { todoReducer } from "../todoReducer.js";

const init = () => {
  return JSON.parse(localStorage.getItem("states")) || [];
};

export const useTodos = () => {
  const [states, dispatch] = useReducer(todoReducer, [], init);

  useEffect(() => {
    localStorage.setItem("states", JSON.stringify(states));
  }, [states]);

  const handleNewTodo = (todo) => {
    const action = {
      type: "[TODO] Add Todo",
      payload: todo,
    };

    dispatch(action);
  };

  const handleDeleteTodo = (id) => {
    dispatch({
      type: "[TODO] Delete Todo",
      payload: id,
    });
  };

  const handleToggleTodo = (id) => {
    dispatch({
      type: "[TODO] Toggle Todo",
      payload: id,
    });
  };

  return {
    handleNewTodo,
    handleDeleteTodo,
    handleToggleTodo,
    states,
    todosCount: states.length,
    pendingTodos: states.filter((todo) => !todo.done).length,
  };
};
