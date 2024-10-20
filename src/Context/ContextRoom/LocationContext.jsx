import { collection, onSnapshot } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { db } from "../../Services/Config_Firebase";

export const ContextLocations = createContext([]);
export const LocationContext = ({ children }) => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const locationColection = collection(db, "locations");

    const unsubscribe = onSnapshot(locationColection, (snapshot) => {
      const locationList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLocations(locationList);
    });
    return () => unsubscribe();
  }, []);
  return (
    <ContextLocations.Provider value={locations}>
      {children}
    </ContextLocations.Provider>
  );
};
