import { UIState } from "./types";
import { Action } from "./types";
import { ActionType } from "./Actions";
import { INITIAL_STATE } from "./IninitalState";

export const reducer = (state: UIState, action: Action): UIState => {
  const { payload } = action;
  const actionsMap: { [key: string]: Function } = {
    [ActionType.RESET_STATE]: resetState,
    [ActionType.ADD_TODO]: addNewToDo,
    [ActionType.DELETE_TODO]: deleteToDo,
    [ActionType.COMPLETE_TODO]: toggleCompleted,
  };
  return actionsMap[action.type] ? actionsMap[action.type]() : state;

  function addNewToDo() {
    return {
      ...state,
      todoList: {
        ...state.todoList,
        [`${payload?.itemKeyValue}`]: {
          toDoItemText: payload?.todo,
          isCompleted: payload?.isCompleted,
          isInEditMode: payload?.isInEditMode,
        },
      },
    };
  }

  function deleteToDo() {
    const list = { ...state.todoList };
    delete list[payload?.itemKeyValue!];
    return {
      ...state,
      todoList: list,
    };
  }

  function toggleCompleted() {
    return {
      ...state,
      todoList: {
        ...state.todoList,
        [`${payload?.itemKeyValue}`]: {
          ...state.todoList[`${payload?.itemKeyValue}`],
          isCompleted: payload?.isCompleted,
        },
      },
    };
  }

  function resetState() {
    return {
      ...INITIAL_STATE,
    };
  }
};