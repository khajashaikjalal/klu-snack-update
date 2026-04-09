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

const AddSnackModal = ({ isOpen, onClose, onSubmit, isAdmin }) => {
    const [snackName, setSnackName] = useState(SNACK_OPTIONS[0]);
    const [customSnack, setCustomSnack] = useState('');
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

        const finalSnack = snackName === "Something Other" && isAdmin ? (customSnack || "Something Other") : snackName;

        if (finalSnack.trim()) {
            onSubmit(finalSnack, null); // Passing null since description is removed
            setSnackName(SNACK_OPTIONS[0]);
            setCustomSnack('');
            setAlertMessage('');
        } else {
            setAlertMessage("Please specify the snack.");
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add today's snack">
            {alertMessage && (
                <div className="mb-4 p-4 bg-yellow-50 text-yellow-600 rounded-lg text-sm text-center">
                    {alertMessage}
                </div>
            )}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                <SelectDropdown
                    options={SNACK_OPTIONS}
                    value={snackName}
                    onChange={setSnackName}
                />

                {snackName === "Something Other" && isAdmin && (
                    <input
                        type="text"
                        className="input-field"
                        placeholder="Admin: Enter custom snack name"
                        value={customSnack}
                        onChange={(e) => setCustomSnack(e.target.value)}
                    />
                )}

                <div className="flex gap-4 mt-4 w-full">
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
