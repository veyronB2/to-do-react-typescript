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
    itemKey: string
  ) => void;

  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    itemKey: string
  ) => void;
};

function ToDoList({
  todoList,
  onButtonClick,
  onCheckBoxClick,
  onInputChange,
  onInputFocus,
  onInputDefocus,
}: ToDoListProps) {
  return (
    <ul className="todo-list">
      {Object.keys(todoList).length === 0 ? (
        <li className="no-todos">No ToDos...</li>
      ) : (
        <ul>
          {Object.keys(todoList).map((key) => {
            const { isCompleted, toDoItemText, isInEditMode } = todoList[key];

            function buttonClickHandler(
              e: React.MouseEvent<HTMLButtonElement>
            ) {
              onButtonClick(e, key);
            }
            function checkBoxClickHandler(
              e: React.MouseEvent<HTMLInputElement>
            ) {
              onCheckBoxClick(e, key);
            }
            function onInputChangeHandler(
              e: React.ChangeEvent<HTMLInputElement>
            ) {
              onInputChange(e, key);
            }
            function inputFocusHandler(e: React.FocusEvent<HTMLInputElement>) {
              onInputFocus(e, key);
            }
            function inputDefocusHandler(
              e: React.FocusEvent<HTMLInputElement>
            ) {
              onInputDefocus(e, key);
            }

            return (
              <li key={key} className="todo-item">
                <Checkbox
                  className="todo-checkbox"
                  onClick={checkBoxClickHandler}
                  isDisabled={isInEditMode ? true : false}
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
                  onChange={onInputChangeHandler}
                  onFocus={inputFocusHandler}
                  onBlur={inputDefocusHandler}
                />
                {isInEditMode && <Button className="todo-btn" btnText="Save" />}
                {!isInEditMode && (
                  <Button
                    className="todo-btn"
                    btnText="Delete"
                    onClick={buttonClickHandler}
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
