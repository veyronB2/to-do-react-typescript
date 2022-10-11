import React from "react";

type checkboxProps = {
  className: string;
  onClick: (e: React.MouseEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
  isChecked?: boolean;
};

function Checkbox({
  className,
  onClick,
  isDisabled,
  isChecked,
}: checkboxProps) {
  return (
    <input
      type="checkbox"
      className={className}
      onClick={onClick}
      disabled={isDisabled}
      defaultChecked={isChecked}
    />
  );
}

export default Checkbox;
