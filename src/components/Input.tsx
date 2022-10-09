import React from "react";

export type InputProps = {
  inputType: string;
  className: string;
  inputValue?: string;
  placeHolder?: string;
  inputDisabled?: boolean;
  reference?: React.LegacyRef<HTMLInputElement>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

function Input({
  inputType,
  className,
  placeHolder,
  onChange,
  inputValue,
  inputDisabled,
  reference,
  onFocus,
  onBlur,
}: InputProps) {
  return (
    <>
      <input
        ref={reference}
        type={inputType}
        className={className}
        placeholder={placeHolder}
        defaultValue={inputValue}
        onChange={onChange}
        disabled={inputDisabled}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </>
  );
}

export default Input;
