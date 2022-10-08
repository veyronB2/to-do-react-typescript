import { ActionType } from "./Actions";

export type ToDoState = {
  isCompleted: boolean;
  toDoItemText: string;
  isInEditMode?: boolean;
};

export type UIState = {
  todoList: { [key: string]: ToDoState };
};

export type Payload = {
  todo?: string;
  isCompleted?: boolean;
  itemKeyValue?: string;
  isInEditMode?: boolean;
};

export type Action = {
  type: ActionType;
  payload?: Payload;
};
