import React, { useEffect, useState } from "react";

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
  const [filter, setFilter] = useState({
    isFiltered: false,
    filterText: "",
  });

  useEffect(() => {
    const { isFiltered, filterText } = filter;

    if (isFiltered && filterText) {
      // return
    }
    if (isFiltered && !filterText) {
      // return ;
    }
    if (!isFiltered && filterText) {
      return setTodoData(
        initialTodoData.filter((item) =>
          item.title.toLowerCase().includes(filterText)
        )
      );
    }

    return setTodoData(initialTodoData);
  }, [filter]);

  console.log("filter :>> ", filter);

  const countTodos = {
    countTotal: todoData.length,
    countDone: todoData.filter((item) => item.done).length,
  };

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

  function toggleProperty(arr, id, propName) {
    const targetIndex = arr.findIndex((item) => item.id === id);
    const targetItem = arr[targetIndex];
    const newTargetItem = { ...targetItem, [propName]: !targetItem[propName] };

    const arrBefore = arr.slice(0, targetIndex);
    const arrAfter = arr.slice(targetIndex + 1);

    return [...arrBefore, newTargetItem, ...arrAfter];
  }

  function handleToggleDone(id) {
    setTodoData((currTodos) => toggleProperty(currTodos, id, "done"));
  }

  function handleToggleImportant(id) {
    setTodoData((currTodos) => toggleProperty(currTodos, id, "important"));
  }

  function createNewTodoItem(title) {
    return {
      id: newTodoId++,
      title,
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
        <Filter setFilter={setFilter} />
        <CounterTodos countTodos={countTodos} />
        <TodoListItems renderTodoItems={renderTodoItems} />
        <AddSection onAddItem={addItem} countTotal={countTodos.countTotal} />
      </article>
    </main>
  );
}

export default AppMain;
