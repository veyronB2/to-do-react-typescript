import { useMemo } from "react";
import ToDoForm from "./components/ToDoForm";
import { INITIAL_STATE } from "./state/InitialState";
import ToDoList from "./components/ToDoList";
import React, { useEffect, useReducer, useState } from "react";
import { reducer } from "./state/Reducer";
import { ActionType } from "./state/Actions";
import Button from "./components/Button";
import StatsAndFilter from "./components/StatsAndFilter";
import { getCompletedToDosPercent, getUniqueKey } from "./shared/utils";

function App() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [userInput, setUserInput] = useState<string>("");
  const { todoCounter, filteredToDoList, currentFilter } = state;

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (userInput) {
      dispatch({
        type: ActionType.ADD_TODO,
        payload: {
          todo: userInput,
          isCompleted: false,
          itemKey: getUniqueKey(),
          isInEditMode: false,
        },
      });
      setUserInput("");
    }

    dispatch({
      type: ActionType.FILTER_TODOS,
      payload: {
        filter: state.currentFilter,
      },
    });
  }

  function handleUserInput(e: React.ChangeEvent<HTMLInputElement>) {
    setUserInput(e.target.value);
  }

  function handleDeleteButtonClick(itemKey?: string) {
    dispatch({
      type: ActionType.DELETE_TODO,
      payload: { itemKey: itemKey },
    });
  }

  function handleCheckBoxClick(itemKey?: string) {
    dispatch({
      type: ActionType.COMPLETE_TODO,
      payload: {
        itemKey: itemKey,
        isCompleted: !state.todoList[itemKey!].isCompleted,
      },
    });
  }

  function handleClearButtonClick() {
    dispatch({
      type: ActionType.RESET_STATE,
    });
  }

  function handleOnFocusToDo(itemKey?: string) {
    dispatch({
      type: ActionType.UPDATE_EDIT_STATUS,
      payload: {
        itemKey: itemKey,
        isInEditMode: !state.todoList[itemKey!].isInEditMode,
      },
    });
  }

  function handleOnFocusOut(
    e: React.FocusEvent<HTMLInputElement>,
    itemKey?: string
  ) {
    dispatch({
      type: ActionType.UPDATE_EDIT_STATUS,
      payload: {
        todo: (e.target as HTMLInputElement).value,
        itemKey: itemKey,
        isInEditMode: !state.todoList[itemKey!].isInEditMode,
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

  function handleFilterChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectedFilter = (e.target as HTMLSelectElement).value.toLowerCase();

    dispatch({
      type: ActionType.UPDATE_FILTER,
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

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <main>
      <section className="container">
        <h1>to do list</h1>
        <StatsAndFilter
          todoCounter={todoCounter}
          todoCompletedRatio={completedRatio}
          todoUncompletedRatio={uncompletedRatio}
          onChange={handleFilterChange}
          selectValue={currentFilter}
        />
        <ToDoForm
          onSubmit={handleFormSubmit}
          onInputChange={handleUserInput}
          inputValue={userInput}
        />
        <ToDoList
          todoList={filteredToDoList}
          onButtonClick={handleDeleteButtonClick}
          onCheckBoxClick={handleCheckBoxClick}
          onFocus={handleOnFocusToDo}
          onFocusOut={handleOnFocusOut}
        />
        <Button
          className="clear-btn"
          btnText="clear list"
          onClick={handleClearButtonClick}
        />
      </section>
    </main>
  );
}

export default App;
