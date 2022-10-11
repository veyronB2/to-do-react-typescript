import { UIState, Action } from "./types";
import { ActionType } from "./Actions";
import { INITIAL_STATE } from "./IninitalState";
import { getFilteredTODOs } from "../shared/utils";

export const reducer = (state: UIState, action: Action): UIState => {
  const { payload } = action;
  const actionsMap: { [key: string]: Function } = {
    [ActionType.RESET_STATE]: resetState,
    [ActionType.ADD_TODO]: addNewToDo,
    [ActionType.DELETE_TODO]: deleteToDo,
    [ActionType.COMPLETE_TODO]: toggleCompleted,
    [ActionType.UPDATE_TODO_TEXT]: updateTODOtext,
    [ActionType.UPDATE_EDIT_STATUS]: updateEditState,
    [ActionType.FILTER_TODOS]: filterTODOs,
  };
  return actionsMap[action.type] ? actionsMap[action.type]() : state;

  function filterTODOs() {
    return {
      ...state,
      currentFilter: payload?.filter,
      filteredtodoList: getFilteredTODOs({
        todoList: state.todoList,
        filter: payload?.filter || false,
      }),
    };
  }

  function updateEditState() {
    return {
      ...state,
      todoList: {
        ...state.todoList,
        [`${payload?.itemKeyValue}`]: {
          ...state.todoList[`${payload?.itemKeyValue}`],
          isInEditMode: payload?.isInEditMode,
          toDoItemText: payload?.todo,
        },
      },
    };
  }

  function updateTODOtext() {
    return {
      ...state,
      todoList: {
        ...state.todoList,
        [`${payload?.itemKeyValue}`]: {
          toDoItemText: payload?.todo,
        },
      },
    };
  }

  function addNewToDo() {
    let todoCounter = state.todoCounter;
    let todoUncompletedCounter = state.todoUncompletedCounter;
    todoCounter++;
    todoUncompletedCounter++;
    return {
      ...state,
      todoCounter: todoCounter,
      todoUncompletedCounter: todoUncompletedCounter,
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
    const isCompleted = list[payload?.itemKeyValue!].isCompleted;
    let counter: number = state.todoCounter;
    let completedCounter: number = state.todoCompletedCounter;
    let uncompletedCounter: number = state.todoUncompletedCounter;

    counter--;

    isCompleted ? completedCounter-- : uncompletedCounter--;

    delete list[payload?.itemKeyValue!];
    return {
      ...state,
      todoCounter: counter,
      todoCompletedCounter: completedCounter,
      todoUncompletedCounter: uncompletedCounter,
      todoList: list,
    };
  }

  function toggleCompleted() {
    let todoCompletedCounter = state.todoCompletedCounter;
    let todoUncompletedCounter = state.todoUncompletedCounter;

    if (payload?.isCompleted) {
      todoCompletedCounter++;
      todoUncompletedCounter--;
    } else {
      todoCompletedCounter--;
      todoUncompletedCounter++;
    }

    return {
      ...state,
      todoCompletedCounter: todoCompletedCounter,
      todoUncompletedCounter: todoUncompletedCounter,
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
