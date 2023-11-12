import React, { type ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
    children: ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div onClick={()=>onClose()} className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow">
                {children}
            </div>
        </div>,
        document.getElementById('modal-root')!
    );
};

export default Modal;
