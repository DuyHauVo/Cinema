import { collection, onSnapshot } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { db } from "../../Services/Config_Firebase";

export const ContextEndow = createContext([]);

export const EndowContext = ({ children }) => {
  const [listEndows, setListEndows] = useState([]);

  const endowCollection = collection(db, "endows");
  useEffect(() => {
    const unsubscribe = onSnapshot(endowCollection, (snapShot) => {
      const endowList = snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setListEndows(endowList);
    });
    return () => unsubscribe();
  }, []);
  return (
    <ContextEndow.Provider value={listEndows}>{children}</ContextEndow.Provider>
  );
};
