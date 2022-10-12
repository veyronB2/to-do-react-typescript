import { ToDoState } from "../state/types";
import Button from "./Button";
import Input from "./Input";
import Checkbox from "./Checkbox";

type ToDoListProps = {
  todoList: { [key: string]: ToDoState };
  onInputDefocus: (
    e: React.FocusEvent<HTMLInputElement>,
    itemKey?: string
  ) => void;

  onInputFocus: (
    e: React.FocusEvent<HTMLInputElement>,
    itemKey?: string
  ) => void;
  onButtonClick: (
    e?: React.MouseEvent<HTMLButtonElement>,
    itemKey?: string
  ) => void;

  onCheckBoxClick: (
    e: React.MouseEvent<HTMLInputElement>,
    itemKey?: string
  ) => void;
};

function ToDoList({
  todoList,
  onButtonClick,
  onCheckBoxClick,
  onInputFocus,
  onInputDefocus,
}: ToDoListProps) {
  function buttonClickHandler(
    e: React.MouseEvent<HTMLButtonElement>,
    itemKey?: string
  ) {
    onButtonClick(e, itemKey);
  }

  function checkBoxClickHandler(
    e: React.MouseEvent<HTMLInputElement>,
    itemKey?: string
  ) {
    onCheckBoxClick(e, itemKey);
  }

  function inputFocusHandler(
    e: React.FocusEvent<HTMLInputElement>,
    itemKey?: string
  ) {
    onInputFocus(e, itemKey);
  }

  function inputDefocusHandler(
    e: React.FocusEvent<HTMLInputElement>,
    itemKey?: string
  ) {
    onInputDefocus(e, itemKey);
  }

  return (
    <ul className="todo-list">
      {Object.keys(todoList).length === 0 ? (
        <li className="no-todos">No ToDos...</li>
      ) : (
        <ul>
          {Object.keys(todoList).map((key) => {
            const { isCompleted, toDoItemText, isInEditMode } = todoList[key];

            return (
              <li key={key} className="todo-item">
                <Checkbox
                  className="todo-checkbox"
                  onClick={checkBoxClickHandler}
                  isDisabled={isInEditMode ? true : false}
                  isChecked={isCompleted}
                  itemKey={key}
                />
                <Input
                  inputType="text"
                  className={
                    isCompleted
                      ? "todo-input todo-completed"
                      : isInEditMode
                      ? "todo-input todo-active"
                      : "todo-input"
                  }
                  inputValue={toDoItemText}
                  inputDisabled={isCompleted ? true : false}
                  onFocus={inputFocusHandler}
                  onBlur={inputDefocusHandler}
                  itemKey={key}
                />
                {isInEditMode && <Button className="todo-btn" btnText="Save" />}
                {!isInEditMode && (
                  <Button
                    className="todo-btn"
                    btnText="Delete"
                    onClick={buttonClickHandler}
                    itemKey={key}
                  />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </ul>
  );
}

export default ToDoList;
