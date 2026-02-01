import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

const VerificationModal = ({ isOpen, onClose, onVerify, onUpdate }) => {
    const [showUpdateInput, setShowUpdateInput] = useState(false);
    const [correctedSnack, setCorrectedSnack] = useState('');

    const handleNo = () => {
        setShowUpdateInput(true);
    };

    const handleUpdate = () => {
        if (correctedSnack.trim()) {
            onUpdate(correctedSnack);
            reset();
        }
    };

    const reset = () => {
        setShowUpdateInput(false);
        setCorrectedSnack('');
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title={showUpdateInput ? "Correct the snack" : "Is this snack correct?"}>
            {!showUpdateInput ? (
                <div className="vertical-stack">
                    <Button variant="primary" onClick={onVerify} className="btn-full">
                        Yes
                    </Button>
                    <Button variant="secondary" onClick={handleNo} className="btn-full">
                        No
                    </Button>
                    <Button variant="secondary" onClick={handleClose} className="btn-full">
                        Not sure
                    </Button>
                </div>
            ) : (
                <div className="vertical-stack">
                    <input
                        type="text"
                        className="input-field"
                        placeholder="Enter correct snack name"
                        value={correctedSnack}
                        onChange={(e) => setCorrectedSnack(e.target.value)}
                        autoFocus
                    />
                    <div className="button-group">
                        <Button variant="secondary" onClick={() => setShowUpdateInput(false)}>
                            Back
                        </Button>
                        <Button variant="primary" onClick={handleUpdate}>
                            Update
                        </Button>
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default VerificationModal;
