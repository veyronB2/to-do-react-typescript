import React from "react";

type checkboxProps = {
  className: string;
  onClick: (e: React.MouseEvent<HTMLInputElement>, itemKey?: string) => void;
  isDisabled?: boolean;
  isChecked?: boolean;
  itemKey?: string;
};

function Checkbox({
  className,
  onClick,
  isDisabled,
  isChecked,
  itemKey,
}: checkboxProps) {
  function clickHandler(e: React.MouseEvent<HTMLInputElement>) {
    console.log(`checkbox itemKey:${itemKey}`);
    onClick(e, itemKey);
  }

  return (
    <input
      type="checkbox"
      className={className}
      onClick={clickHandler}
      disabled={isDisabled}
      defaultChecked={isChecked}
    />
  );
}

export default Checkbox;
