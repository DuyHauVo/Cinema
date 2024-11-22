import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { db } from "../../Services/Config_Firebase";

export const ContextServices = createContext([]);

export const ServiceContext = ({ children }) => {
  const [services, setServices] = useState([]);

  const serviceColection = collection(db, "services");
  useEffect(() => {
    const unsubscribe = onSnapshot(serviceColection, (snapshot) => {
      const listService = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setServices(listService);
    });
    return () => unsubscribe();
  }, []);

  return (
    <ContextServices.Provider value={services}>
      {children}
    </ContextServices.Provider>
  );
};
