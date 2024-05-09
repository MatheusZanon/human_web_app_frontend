import React from "react";
import styles from "./user-alert-logout-modal.module.scss";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal : React.FC<ModalProps> = ({isOpen, onClose, children}) => {
    if (!isOpen) return null;

    return (
        <div className={styles.logoutModal}>
            <div className={styles.logoutModalContent} onClick={e => e.stopPropagation}>
                {children}
                <button className="btn btn-primary" onClick={onClose} style={{ marginTop: 20 }}>Continuar</button>
            </div>
        </div>
    );
}

export default Modal;