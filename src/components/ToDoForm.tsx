import Button from "../components/Button";
import Input from "./Input";

type FormProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
};

function ToDoForm({ onSubmit, onInputChange, inputValue }: FormProps) {
  return (
    <form className="todo-form" onSubmit={onSubmit}>
      <Input
        inputType="text"
        className="add-todo-input"
        placeHolder="Add to do..."
        onChange={onInputChange}
        inputValue={inputValue}
      />
      <Button className="submit-btn" btnText="submit" />
    </form>
  );
}

export default ToDoForm;
