// @ts-nocheck
import React, { useEffect, useState } from "react";
import "./modal.scss";

const Modal = ({ id, active, children }) => {
    const [activeModal, setActiveModal] = useState(false);

    useEffect(() => {
        setActiveModal(active);
    }, [active]);

    return (
        <div id={id} className={`modal ${activeModal ? "active" : ""}`}>
            {children}
        </div>
    );
};



export default Modal;
