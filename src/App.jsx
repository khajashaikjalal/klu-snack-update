import React, { useState, useEffect } from 'react';
import HomeScreen from './screens/HomeScreen';
import './App.css';
import './index.css';

function App() {
  const [snack, setSnack] = useState(null);
  const [verifications, setVerifications] = useState(0);
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  // Refs to hold lazy-loaded Firebase instances
  const dbRef = React.useRef(null);
  const firestoreModuleRef = React.useRef(null);

  useEffect(() => {
    let unsubscribe = null;

    const initFirebase = async () => {
      try {
        // Lazy load Firebase SDK and Config
        const { db } = await import('./firebase');
        const { doc, onSnapshot } = await import('firebase/firestore');

        dbRef.current = db;
        // Store module for use in handlers
        firestoreModuleRef.current = await import('firebase/firestore');

        unsubscribe = onSnapshot(doc(db, "snack", "today"), (docSnap) => {
          setLoading(false);
          setErrorMsg(null);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setSnack(data.snackName);
            setVerifications(data.yesCount || 0);
            setIsVerified((data.yesCount || 0) > 0);
          } else {
            setSnack(null);
            setVerifications(0);
            setIsVerified(false);
          }
        }, (error) => {
          console.error("Error fetching snack:", error);
          setErrorMsg(error.message);
          setLoading(false);
        });
      } catch (err) {
        console.error("Failed to load Firebase", err);
        setErrorMsg("Failed to initialize app.");
        setLoading(false);
      }
    };

    initFirebase();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const handleAddSnack = async (name) => {
    if (!dbRef.current || !firestoreModuleRef.current) return;
    const { doc, setDoc, serverTimestamp } = firestoreModuleRef.current;

    try {
      await setDoc(doc(dbRef.current, "snack", "today"), {
        snackName: name,
        yesCount: 0,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error("Error adding snack:", error);
      alert("Failed to add snack. Please check console.");
    }
  };

  const handleVerifySnack = async () => {
    if (!dbRef.current || !firestoreModuleRef.current) return;
    const { doc, updateDoc, increment } = firestoreModuleRef.current;

    try {
      await updateDoc(doc(dbRef.current, "snack", "today"), {
        yesCount: increment(1)
      });
      alert("Thank you for helping other students!");
    } catch (error) {
      console.error("Error verifying snack:", error);
      alert("Verification failed.");
    }
  };

  const handleUpdateSnack = async (newName) => {
    if (!dbRef.current || !firestoreModuleRef.current) return;
    const { doc, updateDoc, serverTimestamp } = firestoreModuleRef.current;

    try {
      await updateDoc(doc(dbRef.current, "snack", "today"), {
        snackName: newName,
        yesCount: 0,
        updatedAt: serverTimestamp()
      });
      alert("Snack updated successfully");
    } catch (error) {
      console.error("Error updating snack:", error);
      alert("Update failed.");
    }
  };

  if (errorMsg) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8F9FA] px-4 text-center">
        <div className="text-red-600 font-bold mb-2">Connection Error</div>
        <div className="text-gray-700 max-w-md">{errorMsg}</div>
        <p className="text-sm text-gray-500 mt-4">
          Tip: Check if Firestore Database is created and rules are open.
        </p>
      </div>
    );
  }

  // Render HomeScreen immediately. 
  // It handles its own `loading` prop by showing Skeletons.
  return (
    <div className="app-container">
      <HomeScreen
        snack={snack}
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
