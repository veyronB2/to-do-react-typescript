import { UIState } from "./types";
export const INITIAL_STATE: UIState = {
  todoList: {},
  filteredtodoList: {},
  todoCounter: 0,
  todoCompletedCounter: 0,
  todoUncompletedCounter: 0,
  currentFilter: "all",
};
