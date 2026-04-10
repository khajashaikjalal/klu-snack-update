import React, { useState } from 'react';
import { Pencil, Check, Plus } from 'lucide-react';
import Header from '../components/layout/Header';
import Button from '../components/ui/Button';
import AddSnackModal from '../components/snack/AddSnackModal';
import VerificationModal from '../components/snack/VerificationModal';
import Skeleton from '../components/ui/Skeleton';

const HomeScreen = ({ snack, description, lastUpdated, verifications, noCount, isVerified, onAddSnack, onVerifySnack, onVoteNo, onUpdateSnack, loading, isAdmin, onLogoClick, hasContributedToday, isSubmitting }) => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);

    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    const handleAddSubmit = (name, description) => {
        onAddSnack(name, description);
        setIsAddModalOpen(false);
    };

    const handleVerificationYes = () => {
        onVerifySnack();
        setIsVerifyModalOpen(false);
    };

    const handleVerificationNo = () => {
        onVoteNo();
        setIsVerifyModalOpen(false);
    };

    const handleUpdateCallback = (newName) => {
        onUpdateSnack(newName);
        setIsVerifyModalOpen(false);
    };

    return (
        <>
            <Header onLogoClick={onLogoClick} />
            <main className="p-4 fade-in mb-6">
                <div className="feature-card">
                    <div className="date-display">{today}</div>

                    {loading ? (
                        <div className="flex flex-col align-center gap-4 py-4">
                            {/* Snack Name Skeleton */}
                            <Skeleton style={{ height: '2rem', width: '75%', borderRadius: '0.5rem' }} />

                            {/* Status/Icon Skeleton */}
                            <div className="flex align-center gap-2 mt-2">
                                <Skeleton style={{ height: '1rem', width: '8rem', borderRadius: '0.25rem' }} />
                            </div>
                        </div>
                    ) : snack ? (
                        <div className="anmiate-fade-in">
                            <div className="snack-display-container">
                                <div className="flex flex-col align-center">
                                    <h2 className="snack-name">{snack}</h2>
                                    {description && (
                                        <p className="text-gray-500 text-sm mt-1">{description}</p>
                                    )}
                                </div>
                                <button
                                    className="edit-icon-btn"
                                    onClick={() => setIsVerifyModalOpen(true)}
                                    aria-label="Edit or Verify Snack"
                                >
                                    <Pencil size={20} />
                                </button>
                            </div>
                            {isVerified || verifications > 0 ? (
                                <div className="verification-status verified">
                                    <Check size={16} /> Verified by {verifications} student{verifications !== 1 ? 's' : ''}
                                </div>
                            ) : (
                                <div className="verification-status unverified">
                                    Not verified yet
                                </div>
                            )}

                            {lastUpdated && (
                                <div className="last-updated">
                                    Updated at {lastUpdated}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="py-8 animate-fade-in">
                            <h2 className="empty-state-title">
                                {isAdmin || new Date().getHours() < 16 || (new Date().getHours() === 16 && new Date().getMinutes() < 30)
                                    ? isAdmin ? "Welcome Admin! 🛠️" : "Cravings? Hold on! 🛑"
                                    : "Snack not updated yet"}
                            </h2>
                            <p className="empty-state-subtitle">
                                {isAdmin ? "You can add a snack anytime." : (new Date().getHours() < 16 || (new Date().getHours() === 16 && new Date().getMinutes() < 30)
                                    ? "Today's snack drops at 04:30 PM"
                                    : "Usually updated after 5:00 PM")}
                            </p>
                            <Button
                                onClick={() => setIsAddModalOpen(true)}
                                variant="primary"
                                disabled={!isAdmin && (new Date().getHours() < 16 || (new Date().getHours() === 16 && new Date().getMinutes() < 30))}
                            >
                                <Plus size={18} /> Add Today's Snack
                            </Button>
                        </div>
                    )}
                </div>
            </main>

            <AddSnackModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSubmit={handleAddSubmit}
                isAdmin={isAdmin}
                hasContributedToday={hasContributedToday}
                isSubmitting={isSubmitting}
            />

            <VerificationModal
                isOpen={isVerifyModalOpen}
                onClose={() => setIsVerifyModalOpen(false)}
                onVerify={handleVerificationYes}
                onVoteNo={handleVerificationNo}
                onUpdate={handleUpdateCallback}
                yesCount={verifications}
                noCount={noCount}
                isAdmin={isAdmin}
                hasContributedToday={hasContributedToday}
                isSubmitting={isSubmitting}
            />
        </>
    );
};

export default HomeScreen;
