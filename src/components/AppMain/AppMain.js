import React, { useState } from "react";

import "./AppMain.css";
import TodoListItems from "../TodoListItems/TodoListItems";
import Filter from "../Filter/Filter";
import CounterTodos from "../CounterTodos/CounterTodos";
import AddSection from "../AddSection/AddSection";
import TodoItem from "../TodoItem/TodoItem";
import { initialTodoData } from "./../../utils/utils";

let newTodoId = 100; // начало отсчета id новых задач (для передачи его в key)

function AppMain() {
  const [todoData, setTodoData] = useState(initialTodoData);

  console.log("todoData :>> ", todoData);

  function renderTodoItems() {
    return todoData.map((item) => {
      const { id, title, important, done } = item;
      return (
        <TodoItem
          key={id}
          title={title}
          isImportant={important}
          isDone={done}
          onDeleted={() => deletItem(id)}
          onToggleDone={() => handleToggleDone(id)}
          onToggleImportant={() => handleToggleImportant(id)}
        />
      );
    });
  }

  function handleToggleDone(id) {
    setTodoData((currTodos) => {
      const targetIndex = currTodos.findIndex((item) => item.id === id);
      const targetTodo = currTodos[targetIndex];
      const newTargetTodo = { ...targetTodo, done: !targetTodo.done };

      const todosBefore = currTodos.slice(0, targetIndex);
      const todosAfter = currTodos.slice(targetIndex + 1);

      return [...todosBefore, newTargetTodo, ...todosAfter];
    });
  }

  function handleToggleImportant(id) {
    setTodoData((currTodos) => {
      const targetIndex = currTodos.findIndex((item) => item.id === id);
      const targetTodo = currTodos[targetIndex];
      const newTargetTodo = { ...targetTodo, important: !targetTodo.important };

      const todosBefore = currTodos.slice(0, targetIndex);
      const todosAfter = currTodos.slice(targetIndex + 1);

      return [...todosBefore, newTargetTodo, ...todosAfter];
    });
  }

  function createNewTodoItem(title) {
    const regexp = /[\s]{2,}/gim;

    return {
      id: newTodoId++,
      title: title.replace(regexp, " ").trim(),
      important: false,
      done: false,
    };
  }

  function addItem(title) {
    setTodoData((currTodos) => {
      return [...currTodos, createNewTodoItem(title)];
    });
  }

  function deletItem(id) {
    setTodoData((currTodos) => {
      const targetIndex = currTodos.findIndex((item) => item.id === id);
      const newTodosBefore = currTodos.slice(0, targetIndex);
      const newTodosAfter = currTodos.slice(targetIndex + 1);

      return [...newTodosBefore, ...newTodosAfter];
    });
  }

  return (
    <main className="main">
      <article>
        <Filter />
        <CounterTodos />
        <TodoListItems renderTodoItems={renderTodoItems} />
        <AddSection onAddItem={addItem} />
      </article>
    </main>
  );
}

export default AppMain;
