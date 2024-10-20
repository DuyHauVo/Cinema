import { collection, onSnapshot } from "firebase/firestore";
import React, { createContext, useState, useEffect } from "react";
import { db } from "../Services/Config_Firebase";

export const ContextPerformers = createContext([]);

export const PerformerContext = ({ children }) => {
  const [performers, setPerformers] = useState([]);
  useEffect(() => {
    
    const performerCollection = collection(db, "performers");
    // tạo lắng nghe realtime cho bộ sưu tập performer

    const unsubscribe = onSnapshot(performerCollection, (snapshot) => {
      const performersList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPerformers(performersList);
    });
    // Huỷ lắng nghe
    return () => unsubscribe();
  }, []);
  return (
    <ContextPerformers.Provider value={performers}>
      {children}
    </ContextPerformers.Provider>
  );
};
