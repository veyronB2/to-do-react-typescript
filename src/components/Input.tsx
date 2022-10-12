import React from "react";

export type InputProps = {
  inputType: string;
  className: string;
  inputValue?: string;
  placeHolder?: string;
  inputDisabled?: boolean;
  itemKey?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>, itemKey?: string) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>, itemKey?: string) => void;
};

function Input({
  inputType,
  className,
  placeHolder,
  onChange,
  inputValue,
  inputDisabled,
  onFocus,
  onBlur,
  itemKey,
}: InputProps) {
  function onFocusHandler(e: React.FocusEvent<HTMLInputElement>) {
    onFocus?.(e, itemKey);
  }
  function onBlurHandler(e: React.FocusEvent<HTMLInputElement>) {
    onBlur?.(e, itemKey);
  }
  return (
    <>
      <input
        type={inputType}
        className={className}
        placeholder={placeHolder}
        defaultValue={inputValue}
        onChange={onChange}
        disabled={inputDisabled}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
      />
    </>
  );
}

export default Input;
