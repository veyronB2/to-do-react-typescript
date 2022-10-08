import React from "react";

export type InputProps = {
  inputType: string;
  className: string;
  inputValue?: string;
  placeHolder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function Input({
  inputType,
  className,
  placeHolder,
  onChange,
  inputValue,
}: InputProps) {
  const test = true;

  function func(e: React.KeyboardEvent<HTMLInputElement>) {
    e.preventDefault();
  }

  return (
    <>
      <input
        type={inputType}
        className={className}
        placeholder={placeHolder}
        defaultValue={inputValue}
        onChange={onChange}
        onKeyDown={test ? func : undefined}
      />
    </>
  );
}

export default Input;
