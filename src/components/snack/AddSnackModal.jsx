import React, { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import SelectDropdown from '../ui/SelectDropdown';
import { AlertTriangle } from 'lucide-react';

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

const AddSnackModal = ({ isOpen, onClose, onSubmit, isAdmin, hasContributedToday, isSubmitting }) => {
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
                <div className="flex flex-col gap-4">
                    <div className="bg-indigo-50 text-indigo-900 rounded-xl border border-indigo-100 shadow-sm p-4 sm:p-5">
                        <p className="text-red-600 font-black text-center mb-3 animate-pulse uppercase tracking-tight text-sm sm:text-base">
                            ⚠️ REMEMBER: Once Added, You Cannot Update it! ⚠️
                        </p>
                        
                        <p className="text-lg font-bold text-center mb-4 leading-tight">
                            Please take a moment to <br className="sm:hidden"/> think before adding.
                        </p>
                        
                        <div className="space-y-3 text-sm leading-snug text-left">
                            <p className="font-medium border-l-4 border-indigo-300 pl-3">
                                <span className="text-indigo-600 font-bold">Note:</span> This platform is here to help many of your hostel friends. Let’s use it responsibly and for a positive purpose.
                            </p>
                            
                            <p className="text-gray-700 bg-white/60 p-3 rounded-lg border border-indigo-100/50 italic leading-relaxed">
                                If you have ideas for improvement, you’re always welcome to contribute or build something of your own. Knowledge and career growth matter, but so do common sense and civic responsibility.
                            </p>
                        </div>
                    </div>

                    {hasContributedToday && !isAdmin && (
                        <div className="bg-green-50 text-green-700 p-3 rounded-lg text-center text-sm font-medium border border-green-100 animate-fade-in">
                            Already contributed today! 🌟
                        </div>
                    )}

                    <div className="modal-actions">
                        {hasContributedToday && !isAdmin ? (
                            <Button type="button" variant="primary" onClick={handleClose} className="w-full">
                                Close
                            </Button>
                        ) : (
                            <>
                                <Button type="button" variant="secondary" onClick={handleClose}>
                                    Cancel
                                </Button>
                                <Button 
                                    type="button" 
                                    variant="primary" 
                                    onClick={() => setShowWarning(false)}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Processing..." : "I Understand"}
                                </Button>
                            </>
                        )}
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

                    <div className="modal-actions mt-4">
                        <Button type="button" variant="secondary" onClick={() => setShowWarning(true)}>
                            Go Back
                        </Button>
                        <Button 
                            type="submit" 
                            variant="primary"
                            disabled={isSubmitting || (hasContributedToday && !isAdmin)}
                        >
                            {isSubmitting ? "Adding..." : "Add Snack"}
                        </Button>
                    </div>
                </form>
            )}
        </Modal>
    );
};

export default AddSnackModal;
