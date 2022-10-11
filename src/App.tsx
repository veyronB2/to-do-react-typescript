import { useMemo } from "react";
import ToDoForm from "./components/ToDoForm";
import { INITIAL_STATE } from "./state/IninitalState";
import ToDoList from "./components/ToDoList";
import React, { useEffect, useReducer, useState } from "react";
import { reducer } from "./state/Reducer";
import { ActionType } from "./state/Actions";
import Button from "./components/Button";
import StatsAndFilter from "./components/StatsAndFilter";
import { getCompletedToDosPercent } from "./shared/utils";

function setUniqueKey() {
  let date = new Date();
  date.toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "full",
    hour12: false,
  });
  let key = `${date.getDay()}${
    date.getMonth() + 1
  }${date.getFullYear()}_${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
  return key;
}

function App() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [formInputValue, setformInputValue] = useState<string>("");
  const [itemKeyValue, setitemKeyValue] = useState<string>("");
  const { todoList, todoCounter, filteredtodoList, currentFilter } = state;

  function formOnSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (formInputValue) {
      dispatch({
        type: ActionType.ADD_TODO,
        payload: {
          todo: formInputValue,
          isCompleted: false,
          itemKeyValue: itemKeyValue,
          isInEditMode: false,
        },
      });
    }

    (e.target as HTMLFormElement).reset();
    setformInputValue("");
    setitemKeyValue("");
  }

  function formInputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setformInputValue(e.target.value);
  }

  function deleteTODOitem(
    e?: React.MouseEvent<HTMLButtonElement>,
    itemKey?: string
  ) {
    const btnText = (e?.target as HTMLButtonElement).textContent;

    if (btnText?.toLocaleLowerCase() === "delete") {
      dispatch({
        type: ActionType.DELETE_TODO,
        payload: { itemKeyValue: itemKey },
      });
    }
  }

  function onCheckBoxClick(
    e: React.MouseEvent<HTMLInputElement>,
    itemKey: string
  ) {
    const isChecked = (e.target as HTMLInputElement).checked;
    dispatch({
      type: ActionType.COMPLETE_TODO,
      payload: { itemKeyValue: itemKey, isCompleted: isChecked },
    });
  }

  function clearButtonClickHandler() {
    dispatch({
      type: ActionType.RESET_STATE,
    });
  }

  function onToDoInputFocusHandler(
    e: React.FocusEvent<HTMLInputElement>,
    itemKey?: string
  ) {
    dispatch({
      type: ActionType.UPDATE_EDIT_STATUS,
      payload: {
        todo: (e.target as HTMLInputElement).value,
        itemKeyValue: itemKey,
        isInEditMode: true,
      },
    });
  }

  function onToDoInputDefocusHandler(
    e: React.FocusEvent<HTMLInputElement>,
    itemKey?: string
  ) {
    dispatch({
      type: ActionType.UPDATE_EDIT_STATUS,
      payload: {
        todo: (e.target as HTMLInputElement).value,
        itemKeyValue: itemKey,
        isInEditMode: false,
      },
    });
  }

  const counterToDo = state.todoCounter;
  const todoCompletedCounter = state.todoCompletedCounter;
  const todoUncompletedCounter = state.todoUncompletedCounter;
  const { uncompletedRatio, completedRatio } = useMemo(
    () =>
      getCompletedToDosPercent({
        counterToDo,
        todoUncompletedCounter,
        todoCompletedCounter,
      }),
    [counterToDo, todoCompletedCounter, todoUncompletedCounter]
  );

  function onFilterChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectedFilter = (
      e.target as HTMLSelectElement
    ).value.toLocaleLowerCase();

    dispatch({
      type: ActionType.FILTER_TODOS,
      payload: {
        filter: selectedFilter,
      },
    });
  }

  useEffect(() => {
    dispatch({
      type: ActionType.FILTER_TODOS,
      payload: {
        filter: state.currentFilter,
      },
    });
  }, [
    state.currentFilter,
    state.todoCompletedCounter,
    state.todoUncompletedCounter,
    state.todoCounter,
  ]);

  // useEffect(() => {
  //   // console.log(state);
  // }, [state]);

  useEffect(() => {
    setitemKeyValue(setUniqueKey());
  }, [formInputValue]);

  return (
    <main>
      <section className="container">
        <h1>to do list</h1>
        <StatsAndFilter
          todoCounter={todoCounter}
          todoCompletedRatio={completedRatio}
          todoUncompletedRatio={uncompletedRatio}
          onChange={onFilterChange}
          selectValue={currentFilter}
        />
        <ToDoForm
          onSubmit={formOnSubmitHandler}
          onInputChange={formInputChangeHandler}
          inputValue={formInputValue}
        />
        <ToDoList
          todoList={state.currentFilter === "all" ? todoList : filteredtodoList}
          onButtonClick={deleteTODOitem}
          onCheckBoxClick={onCheckBoxClick}
          onInputFocus={onToDoInputFocusHandler}
          onInputDefocus={onToDoInputDefocusHandler}
        />
        <Button
          className="clear-btn"
          btnText="clear list"
          onClick={clearButtonClickHandler}
        />
      </section>
    </main>
  );
}

export default App;
