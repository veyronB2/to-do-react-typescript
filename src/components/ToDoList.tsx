import { ToDoState } from "../state/types";
import Button from "./Button";
import Input from "./Input";
import Checkbox from "./Checkbox";

type ToDoListProps = {
  todoList: { [key: string]: ToDoState };
  onButtonClick: (
    e?: React.MouseEvent<HTMLButtonElement>,
    itemKey?: string
  ) => void;
  onCheckBoxClick: (
    e: React.MouseEvent<HTMLInputElement>,
    itemKey: string
  ) => void;
};

function ToDoList({ todoList, onButtonClick, onCheckBoxClick }: ToDoListProps) {
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

            return (
              <li key={key} className="todo-item">
                <Checkbox
                  className="todo-checkbox"
                  onClick={checkBoxClickHandler}
                />
                <Input
                  inputType="text"
                  className={
                    isCompleted ? "todo-input todo-completed" : "todo-input"
                  }
                  inputValue={toDoItemText}
                />
                <Button
                  className="todo-btn"
                  btnText={isInEditMode ? "Save" : "Delete"}
                  onClick={buttonClickHandler}
                />
              </li>
            );
          })}
        </ul>
      )}
    </ul>
  );
}

export default ToDoList;
