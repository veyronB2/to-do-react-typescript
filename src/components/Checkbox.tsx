import React from "react";

type checkboxProps = {
  className: string;
  onClick: (e: React.MouseEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
};

function Checkbox({ className, onClick }: checkboxProps) {
  return (
    <input
      type="checkbox"
      className={className}
      onClick={onClick}
      disabled={false}
    />
  );
}

export default Checkbox;
