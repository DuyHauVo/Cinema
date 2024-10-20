import { collection, onSnapshot } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { db } from "../../Services/Config_Firebase";

export const ContextChairs = createContext([]);
export const ChairsContext = ({ children }) => {
  const [chairs, setChairs] = useState([]);
  useEffect(() => {
    const chairsColection = collection(db, "chairs");

    const unsubscribe = onSnapshot(chairsColection, (snapshot) => {
      const chairsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChairs(chairsList);
    });
    return () => unsubscribe();
  }, []);
  return (
    <ContextChairs.Provider value={chairs}>{children}</ContextChairs.Provider>
  );
};
