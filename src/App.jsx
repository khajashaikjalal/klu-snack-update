import React, { useState, useEffect } from 'react';
import HomeScreen from './screens/HomeScreen';
import './App.css';
import './index.css';
import { db } from './firebase';
import { doc, onSnapshot, setDoc, updateDoc, increment, serverTimestamp } from 'firebase/firestore';

function App() {
  const [snack, setSnack] = useState(null);
  const [lastUpdated, setLastUpdated] = useState("");
  const [verifications, setVerifications] = useState(0);
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    // Simple, direct listener. No complexity.
    const unsubscribe = onSnapshot(
      doc(db, "snack", "today"),
      (docSnap) => {
        setLoading(false);
        setErrorMsg(null);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const snackName = data.snackName;
          const updatedAt = data.updatedAt;

          // Logic: 
          // 1. If updatedAt is null, it means it's being written RIGHT NOW (Pending). Show it.
          // 2. If updatedAt exists, check if it's from today.

          let showSnack = false;
          let formattedTime = "";

          if (updatedAt === null) {
            showSnack = true; // Pending write -> Show immediately
            formattedTime = "Just now...";
          } else {
            // Check date
            const date = updatedAt.toDate();
            const today = new Date();

            const isSameDay =
              date.getDate() === today.getDate() &&
              date.getMonth() === today.getMonth() &&
              date.getFullYear() === today.getFullYear();

            if (isSameDay) {
              showSnack = true;
              // Force en-US locale and 12-hour format to ensure AM/PM on all devices
              formattedTime = date.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
              });
            }
          }

          if (showSnack) {
            setSnack(snackName);
            setLastUpdated(formattedTime);
            setVerifications(data.yesCount || 0);
            setIsVerified((data.yesCount || 0) > 0);
          } else {
            // Old data or invalid date
            setSnack(null);
            setVerifications(0);
            setIsVerified(false);
          }

        } else {
          // No document exists
          setSnack(null);
          setVerifications(0);
          setIsVerified(false);
        }
      },
      (error) => {
        console.error("Firebase Connection Error:", error);
        setErrorMsg("Could not connect to snack database.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleAddSnack = async (name) => {
    try {
      await setDoc(doc(db, "snack", "today"), {
        snackName: name,
        yesCount: 0,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error("Error adding snack:", error);
      alert("Failed. Check internet connection.");
    }
  };

  const handleVerifySnack = async () => {
    try {
      await updateDoc(doc(db, "snack", "today"), {
        yesCount: increment(1)
      });
    } catch (error) {
      console.error("Error verifying:", error);
      alert("Failed to verify.");
    }
  };

  const handleUpdateSnack = async (newName) => {
    try {
      await updateDoc(doc(db, "snack", "today"), {
        snackName: newName,
        yesCount: 0,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error("Error updating:", error);
      alert("Failed to update.");
    }
  };

  if (errorMsg) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 font-bold">{errorMsg}</p>
      </div>
    );
  }

  // Render HomeScreen immediately. 
  // It handles its own `loading` prop by showing Skeletons.
  return (
    <div className="app-container">
      <HomeScreen
        snack={snack}
        lastUpdated={lastUpdated}
        verifications={verifications}
        isVerified={isVerified}
        onAddSnack={handleAddSnack}
        onVerifySnack={handleVerifySnack}
        onUpdateSnack={handleUpdateSnack}
        loading={loading}
      />
    </div>
  );
}

export default App;
