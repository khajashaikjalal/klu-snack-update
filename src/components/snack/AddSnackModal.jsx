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

const AddSnackModal = ({ isOpen, onClose, onSubmit, isAdmin, hasContributedToday }) => {
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
                    <div className="warning-box bg-red-50 text-gray-800 rounded-2xl border border-red-100 shadow-sm">
                        <div className="warning-title text-red-600 font-bold mb-4">
                            <AlertTriangle size={24} />
                            <span>Wait! Think before you add.</span>
                        </div>
                        
                        <p className="text-center text-red-700 font-bold text-lg mb-6 leading-tight max-w-md mx-auto">
                            Once Add you cannot Update. Remember it!
                        </p>
                        
                        <div className="h-px bg-red-100 w-full mb-6"></div>
                        
                        <div className="warning-text flex flex-col gap-4 text-md leading-relaxed">
                            <p>
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-red-100 text-red-600 mr-2">NOTE</span>
                                For those being negative or making jokes — remember, you are helping hundreds of your hostel friends. Use technology wisely and for a good purpose. I believe we are all literate, right?
                            </p>
                            
                            <p className="italic font-medium text-gray-700 border-l-4 border-gray-200 pl-4 py-1">
                                If you have the courage, try building an application like this yourself. Having knowledge and getting a job is not everything; having common sense and civic sense matters far more.
                            </p>
                        </div>
                    </div>

                    {hasContributedToday && !isAdmin && (
                        <div className="bg-green-50 text-green-700 p-4 rounded-xl text-center font-medium border border-green-100 animate-fade-in">
                            You've already contributed today! 🌟 <br/>
                            <span className="text-sm opacity-80">You can add again tomorrow.</span>
                        </div>
                    )}

                    <div className="modal-actions">
                        <Button type="button" variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button 
                            type="button" 
                            variant="primary" 
                            onClick={() => setShowWarning(false)}
                            disabled={hasContributedToday && !isAdmin}
                        >
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

                    <div className="modal-actions mt-4">
                        <Button type="button" variant="secondary" onClick={() => setShowWarning(true)}>
                            Go Back
                        </Button>
                        <Button 
                            type="submit" 
                            variant="primary"
                            disabled={hasContributedToday && !isAdmin}
                        >
                            Add Snack
                        </Button>
                    </div>
                </form>
            )}
        </Modal>
    );
};

export default AddSnackModal;
