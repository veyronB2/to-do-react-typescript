import React from "react";

type ButtonProps = {
  className: string;
  btnText: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>, itemKey?: string) => void;
  itemKey?: string;
};

function Button({ className, btnText, onClick, itemKey }: ButtonProps) {
  function clickHandler(e: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(e, itemKey);
  }
  return (
    <button className={className} onClick={clickHandler}>
      {btnText}
    </button>
  );
}

export default Button;
