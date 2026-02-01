import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

const AddSnackModal = ({ isOpen, onClose, onSubmit }) => {
    const [snackName, setSnackName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (snackName.trim()) {
            onSubmit(snackName);
            setSnackName('');
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add today's snack">
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
