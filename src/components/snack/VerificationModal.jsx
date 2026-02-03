import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

const VerificationModal = ({ isOpen, onClose, onVerify, onVoteNo, onUpdate, yesCount, noCount, isAdmin }) => {
    const [showUpdateInput, setShowUpdateInput] = useState(false);
    const [correctedSnack, setCorrectedSnack] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    const reset = () => {
        setShowUpdateInput(false);
        setCorrectedSnack('');
        setAlertMessage('');
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    const isTimeAllowed = () => {
        if (isAdmin) return true;

        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        // 4:30 PM is 16:30
        return hours > 16 || (hours === 16 && minutes >= 30);
    };

    const handleYes = () => {
        if (!isTimeAllowed()) {
            setAlertMessage("Contributions open at 4:30 PM!");
            return;
        }
        onVerify();
    };

    const handleNo = () => {
        if (!isTimeAllowed()) {
            setAlertMessage("Contributions open at 4:30 PM!");
            return;
        }

        // Admin Override: Immediately allow update
        if (isAdmin) {
            setShowUpdateInput(true);
            setAlertMessage('');
            return;
        }

        // Strict Consensus Logic
        // 1. Must have at least 20 'No' votes
        // 2. 'No' votes must exceed 'Yes' votes
        if ((noCount || 0) >= 20 && (noCount || 0) > (yesCount || 0)) {
            setShowUpdateInput(true);
            setAlertMessage('');
        } else {
            // Just record a vote
            onVoteNo();
            setAlertMessage("Contribution recorded! More negative feedback needed to edit.");
            // Close after short delay or let them close? 
            // Better UX: Show message, then close after 1.5s
            setTimeout(() => {
                handleClose();
            }, 2000);
        }
    };

    const handleUpdate = () => {
        if (correctedSnack.trim()) {
            onUpdate(correctedSnack);
            reset();
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title={showUpdateInput ? "Correct the snack" : "Is this snack correct?"}>
            {alertMessage && (
                <div className="mb-6 p-2 bg-yellow-100 text-yellow-800 rounded text-sm text-center">
                    {alertMessage}
                </div>
            )}

            {!showUpdateInput ? (
                <div className="vertical-stack">
                    <Button variant="primary" onClick={handleYes} className="btn-full">
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
                    <div className="relative">
                        <input
                            type="text"
                            className="input-field"
                            placeholder="Enter correct snack name"
                            value={correctedSnack}
                            maxLength={30}
                            onChange={(e) => setCorrectedSnack(e.target.value)}
                            autoFocus
                        />
                        <div className="text-right text-xs text-gray-500 mt-1">
                            {correctedSnack.length}/30
                        </div>
                    </div>
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
