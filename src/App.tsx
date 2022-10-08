import ToDoForm from "./components/ToDoForm";
import { INITIAL_STATE } from "./state/IninitalState";
import ToDoList from "./components/ToDoList";
import React, { useEffect, useReducer, useState } from "react";
import { reducer } from "./state/Reducer";
import { ActionType } from "./state/Actions";
import Button from "./components/Button";

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
  const { todoList } = state;

  function formOnSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch({
      type: ActionType.ADD_TODO,
      payload: {
        todo: formInputValue,
        isCompleted: false,
        itemKeyValue: itemKeyValue,
        isInEditMode: false,
      },
    });

    (e.target as HTMLFormElement).reset();
    setformInputValue("");
    setitemKeyValue("");
  }

  function formInputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setformInputValue(e.target.value);
  }

  function deleteOrUpdateToDoItem(
    e?: React.MouseEvent<HTMLButtonElement>,
    itemKey?: string
  ) {
    const { isInEditMode } = state.todoList[itemKey!];

    if (isInEditMode) {
      console.log("being edited");
    } else {
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

  useEffect(() => {
    console.log(state.todoList);
  }, [state]);

  useEffect(() => {
    setitemKeyValue(setUniqueKey());
  }, [formInputValue]);

  return (
    <main>
      <section className="container">
        <h1>to do list</h1>
        <ToDoForm
          onSubmit={formOnSubmitHandler}
          onInputChange={formInputChangeHandler}
          inputValue={formInputValue}
        />
        <ToDoList
          todoList={todoList}
          onButtonClick={deleteOrUpdateToDoItem}
          onCheckBoxClick={onCheckBoxClick}
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
