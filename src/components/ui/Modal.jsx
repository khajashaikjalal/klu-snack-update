import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="flex justify-between align-center mb-6">
                    <h2 className="text-xl font-bold">{title}</h2>
                    {onClose && (
                        <button className="btn-close" onClick={onClose}>
                            <X size={20} />
                        </button>
                    )}
                </div>
                <div className="w-full">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
