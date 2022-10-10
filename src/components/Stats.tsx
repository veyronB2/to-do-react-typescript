type statsProps = {
  todoCounter: number;
  todoCompletedRatio: string;
  todoUncompletedRatio: string;
};

function Stats({
  todoCounter,
  todoCompletedRatio,
  todoUncompletedRatio,
}: statsProps) {
  return (
    <div className="stats-container">
      <p>
        All:<span id="all-todos-counter">{todoCounter}</span>
      </p>

      <p>
        Completed:<span id="completed-todo-ratio">{todoCompletedRatio}</span>
      </p>
      <p>
        Uncompleted:
        <span id="uncompleted-todo-ratio">{todoUncompletedRatio}</span>
      </p>
      <select name="todo-filter">
        <option value="all">All</option>
        <option value="completed">completed</option>
        <option value="uncompleted">uncompleted</option>
      </select>
    </div>
  );
}

export default Stats;
