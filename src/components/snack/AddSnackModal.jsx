import React, { useState, useEffect } from 'react';
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

const AddSnackModal = ({ isOpen, onClose, onSubmit, isAdmin }) => {
    const [snackName, setSnackName] = useState(SNACK_OPTIONS[0]);
    const [customSnack, setCustomSnack] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [showWarning, setShowWarning] = useState(true);

    // Reset to warning view whenever modal is opened
    useEffect(() => {
        if (isOpen) {
            setShowWarning(true);
            setAlertMessage('');
        }
    }, [isOpen]);

    const isTimeAllowed = () => {
        if (isAdmin) return true;

        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        // 4:30 PM is 16:30
        return hours > 16 || (hours === 16 && minutes >= 30);
    };

    const handleClose = () => {
        setAlertMessage('');
        onClose();
    };

    const handleSubmit = (e) => {
        if (e) e.preventDefault();

        if (!isTimeAllowed()) {
            setAlertMessage("Contributions open at 4:30 PM!");
            return;
        }

        const finalSnack = snackName === "Something Other" && isAdmin ? (customSnack || "Something Other") : snackName;

        if (!finalSnack.trim()) {
            setAlertMessage("Please specify the snack.");
            return;
        }

        onSubmit(finalSnack, null); // Passing null since description is removed
        setSnackName(SNACK_OPTIONS[0]);
        setCustomSnack('');
        setAlertMessage('');
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title={showWarning ? "Before You Proceed" : "Add today's snack"}>
            {alertMessage && (
                <div className="mb-4 p-4 bg-yellow-50 text-yellow-600 rounded-lg text-sm text-center">
                    {alertMessage}
                </div>
            )}
            
            {showWarning ? (
                <div className="flex flex-col gap-6">
                    <div className="p-5 bg-red-50 text-gray-800 rounded-2xl border border-red-100 shadow-sm">
                        <p className="text-lg font-bold text-red-600 mb-3">Wait! Think before you add.</p>
                        
                        <div className="flex flex-col gap-4 text-md leading-relaxed">
                            <p>
                                <span className="font-bold text-primary-color">NOTE:</span> For those being negative or making jokes — remember, you are helping hundreds of your hostel friends. Use technology wisely and for a good purpose. I believe we are all literate, right?
                            </p>
                            
                            <p className="italic font-medium text-gray-700">
                                If you have the courage, try building an application like this yourself. Having knowledge and getting a job is not everything; having common sense and civic sense matters far more.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4 w-full">
                        <Button type="button" variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button type="button" variant="primary" onClick={() => setShowWarning(false)}>
                            I Understand, Proceed
                        </Button>
                    </div>
                </div>
            ) : (
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
                        <Button type="button" variant="secondary" onClick={() => setShowWarning(true)}>
                            Go Back
                        </Button>
                        <Button type="submit" variant="primary">
                            Add Snack
                        </Button>
                    </div>
                </form>
            )}
        </Modal>
    );
};

export default AddSnackModal;
