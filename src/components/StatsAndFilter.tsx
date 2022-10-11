type statsProps = {
  todoCounter: number;
  todoCompletedRatio: string;
  todoUncompletedRatio: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectValue: string;
};

function StatsAndFilter({
  todoCounter,
  todoCompletedRatio,
  todoUncompletedRatio,
  onChange,
  selectValue,
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

      <select
        value={selectValue}
        name="todo-filter"
        className="todo-filter"
        onChange={onChange}
      >
        <option value="default">All</option>
        <option value="completed">completed</option>
        <option value="uncompleted">uncompleted</option>
      </select>
    </div>
  );
}

export default StatsAndFilter;
