import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import SelectDropdown from '../ui/SelectDropdown';

const SNACK_OPTIONS = [
    "Aloo Bonda",
    "Banana Bajji",
    "Biscuits",
    "Biscuits and Onion Pakodi",
    "Cake",
    "Chat Masala",
    "Chocolate Dilpasand",
    "Cream Bun",
    "Dil Pasand",
    "Egg/Veg Puffs",
    "Fried Batany",
    "Fried Chana",
    "Fried Palli",
    "Laddu",
    "Masala Vada",
    "Mirchi Bajji",
    "Mixture",
    "Onion Pakodi",
    "Pani Poori",
    "Pav Baaji",
    "Potato Bajji",
    "Punugulu",
    "Roasted Dry Chana",
    "Samosa",
    "Suji(Ravva) Laddu",
    "Suji(Ravva) Laddu and Mixture",
    "Sweet Corn",
    "Veg Manchuria",
    "Veg Noodles",
    "Something Other"
];

const VerificationModal = ({ isOpen, onClose, onVerify, onVoteNo, onUpdate, yesCount, noCount, isAdmin, hasContributedToday, isSubmitting }) => {
    const [showUpdateInput, setShowUpdateInput] = useState(false);
    const [correctedSnack, setCorrectedSnack] = useState(SNACK_OPTIONS[0]);
    const [customSnack, setCustomSnack] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    const reset = () => {
        setShowUpdateInput(false);
        setCorrectedSnack(SNACK_OPTIONS[0]);
        setCustomSnack('');
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

        // Just record a vote
        onVoteNo();
    };

    const handleUpdate = () => {
        const finalSnack = correctedSnack === "Something Other" && isAdmin ? (customSnack || "Something Other") : correctedSnack;

        if (finalSnack.trim()) {
            onUpdate(finalSnack);
            reset();
        } else {
            setAlertMessage("Please specify the custom snack.");
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title={showUpdateInput ? "Correct the snack" : "Is this snack correct?"}>
            {alertMessage && (
                <div className="mb-4 p-4 bg-yellow-50 text-yellow-600 rounded-lg text-sm text-center">
                    {alertMessage}
                </div>
            )}

            {hasContributedToday && (
                <div className="mb-6 bg-green-50 text-green-700 p-4 rounded-xl text-center font-medium border border-green-100 animate-fade-in">
                    Combined contribution recorded! 🌟<br/>
                    <span className="text-sm opacity-80 font-normal">Thanks for helping your friends today. See you tomorrow!</span>
                </div>
            )}

            {!showUpdateInput ? (
                <div className="flex flex-col gap-2 w-full">
                    {hasContributedToday ? (
                        <Button variant="primary" onClick={handleClose} className="w-full mt-2">
                            Done
                        </Button>
                    ) : (
                        <>
                            <Button 
                                variant="primary" 
                                onClick={handleYes} 
                                className="w-full"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Sending..." : "Yes, it's correct"}
                            </Button>
                            <Button 
                                variant="secondary" 
                                onClick={handleNo} 
                                className="w-full"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "..." : "No, it's something else"}
                            </Button>
                            {!isSubmitting && (
                                <Button variant="text" onClick={handleClose} className="mt-2 text-sm opacity-60">
                                    Not sure
                                </Button>
                            )}
                        </>
                    )}
                </div>
            ) : (
                <div className="flex flex-col gap-4 w-full">
                    <SelectDropdown
                        options={SNACK_OPTIONS}
                        value={correctedSnack}
                        onChange={setCorrectedSnack}
                    />

                    {correctedSnack === "Something Other" && isAdmin && (
                        <div className="relative mb-2">
                            <input
                                type="text"
                                className="input-field"
                                placeholder="Admin: Enter correct custom snack name"
                                value={customSnack}
                                maxLength={30}
                                onChange={(e) => setCustomSnack(e.target.value)}
                            />
                            <div className="text-right text-sm text-gray-500 mt-1">
                                {customSnack.length}/30
                            </div>
                        </div>
                    )}

                    <div className="flex gap-4 mt-2 w-full">
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
