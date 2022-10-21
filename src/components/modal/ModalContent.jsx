// @ts-nocheck
import { useRef } from "react";
import { HiX } from "react-icons/hi";
import "./modal.scss";


const ModalContent = ({ children, onClose }) => {
    const contentRef = useRef(null);

    const closeModal = () => {
        contentRef.current.parentNode.classList.remove("active");
        if (onClose) onClose();
    };

    return (
        <div ref={contentRef} className="modal__content" >
            {children}
            <span >
                <HiX className="modal__content__close" onClick={closeModal} />
            </span>
        </div>
    );
};

export default ModalContent