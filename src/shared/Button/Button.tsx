import React, { ReactNode, MouseEvent } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  type?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "primary",
}) => {
  return (
    <button className={`button button--${type}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
