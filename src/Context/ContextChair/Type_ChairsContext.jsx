import { collection, onSnapshot } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { db } from "../../Services/Config_Firebase";

export const ContextType_Chairs = createContext([]);

export const Type_ChairsContext = ({ children }) => {
  const [type_Chairs, setType_Chairs] = useState([]);

  useEffect(() => {
    const type_ChairsColection = collection(db, "type_chairs");
    const unsubscribe = onSnapshot(type_ChairsColection, (snapshot) => {
      const type_ChairsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setType_Chairs(type_ChairsList);
    });
    return () => unsubscribe();
  }, []);
  return (
    <ContextType_Chairs.Provider value={type_Chairs}>
      {children}
    </ContextType_Chairs.Provider>
  );
};
