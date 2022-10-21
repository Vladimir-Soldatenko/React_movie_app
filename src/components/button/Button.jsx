// @ts-nocheck
import React from "react";
import "./button.scss";

const Button = ({ children, onClick, className }) => {
    return (
        <button className={`btn ${className}`} onClick={onClick ? () => onClick() : null}>
            {children}
        </button>
    );
};

export const OutlineButton = ({ children, className, onClick }) => {
    return (
        <Button className={`btn-outline ${className}`} onClick={onClick ? () => onClick() : null}>
            {children}
        </Button>
    );
};
export default Button;
