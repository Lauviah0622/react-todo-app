import { useCallback, useState } from "react";


const createTodo = (function () {
    let counter = 1;
    return function (content) {
      return {
        id: counter++,
        content,
        isDone: false,
      };
    };
  })();

export default function useTodos() {
  const [todosData, setTodosData] = useState([createTodo("讓你試試看")]);
  
  const addTodo = useCallback((content) => {
    setTodosData((prevTodosData) => [
      createTodo(content.length === 0 ? "忙些事兒" : content),
      ...prevTodosData,
    ]);
  }, []);

  const deleteTodo = useCallback(id => {
    setTodosData((prevTodosData) =>
      prevTodosData.filter((todo) => todo.id !== id)
    );
  }, []);

  const updateTodoContent = useCallback((id, content) => {
    setTodosData((prevTodosData) =>
      prevTodosData.map((todo) => {
        if (id !== todo.id) return todo;
        return {
          ...todo,
          content: content,
        };
      })
    );
  }, []);

  const toggleTodoDone = useCallback((id) => {
    setTodosData((prevTodosData) =>
      prevTodosData.map((todo) => {
        if (id !== todo.id) return todo;
        return {
          ...todo,
          isDone: !todo.isDone,
        };
      })
    );
  }, []);

  return {
      todosData,
      setTodosData,
      addTodo,
      deleteTodo,
      updateTodoContent,
      toggleTodoDone
  }
}
