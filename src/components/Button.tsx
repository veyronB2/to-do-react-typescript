import React from "react";

type ButtonProps = {
  className: string;
  btnText: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

function Button({ className, btnText, onClick }: ButtonProps) {
  return (
    <button className={className} onClick={onClick}>
      {btnText}
    </button>
  );
}

export default Button;
