import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

const AddSnackModal = ({ isOpen, onClose, onSubmit, isAdmin }) => {
    const [snackName, setSnackName] = useState('');

    const [alertMessage, setAlertMessage] = useState('');

    const isTimeAllowed = () => {
        if (isAdmin) return true;

        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        // 4:30 PM is 16:30
        return hours > 16 || (hours === 16 && minutes >= 30);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isTimeAllowed()) {
            setAlertMessage("Contributions open at 4:30 PM!");
            return;
        }

        if (snackName.trim()) {
            onSubmit(snackName);
            setSnackName('');
            setAlertMessage('');
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add today's snack">
            {alertMessage && (
                <div className="mb-6 p-2 bg-yellow-100 text-yellow-800 rounded text-sm text-center">
                    {alertMessage}
                </div>
            )}
            <form onSubmit={handleSubmit} className="vertical-stack">
                <input
                    type="text"
                    className="input-field"
                    placeholder="e.g., Sweet Corn, Tea, and Milk"
                    value={snackName}
                    onChange={(e) => setSnackName(e.target.value)}
                    autoFocus
                />
                <div className="button-group">
                    <Button type="button" variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary">
                        Submit
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default AddSnackModal;
