import { collection, onSnapshot } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { db } from "../../Services/Config_Firebase";

export const ContextRegions = createContext([]);

export const RegionsContext = ({ children }) => {
  const [regions, setRegions] = useState([]);
  useEffect(() => {
    const regionsColection = collection(db, "regions");
    const unsubscribe = onSnapshot(regionsColection, (snapshot) => {
      const regionsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRegions(regionsList);
    });
    return () => unsubscribe();
  }, []);
  return (
    <ContextRegions.Provider value={regions}>
      {children}
    </ContextRegions.Provider>
  );
};
