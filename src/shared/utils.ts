type statsProps = {
  counterToDo: number;
  todoUncompletedCounter: number;
  todoCompletedCounter: number;
};

export function getCompletedToDosPercent({
  counterToDo,
  todoUncompletedCounter,
  todoCompletedCounter,
}: statsProps) {
  let uncompletedRatio: string;
  let completedRatio: string;

  if (counterToDo === 0) {
    uncompletedRatio = "0%";
    completedRatio = "0%";
  } else {
    uncompletedRatio = `${Math.round(
      (todoUncompletedCounter / counterToDo) * 100
    ).toString()}%`;

    completedRatio = `${Math.round(
      (todoCompletedCounter / counterToDo) * 100
    ).toString()}%`;
  }

  return {
    uncompletedRatio,
    completedRatio,
  };
}
