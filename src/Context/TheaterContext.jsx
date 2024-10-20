import { collection, onSnapshot } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { db } from "../Services/Config_Firebase";

export const ContextTheaters = createContext([]);

export const TheaterContext = ({ children }) => {
  const [theaters, setTheaters] = useState([]);
  useEffect(() => {
    // collection
    const theaterColection = collection(db, "theaters");
    // tạo một hàm lắng nghe realtime

    const unsubscribe = onSnapshot(theaterColection, (snapshot) => {
      const theaterList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTheaters(theaterList);
    });

    return () => unsubscribe();
  }, []);
  return (
    <ContextTheaters.Provider value={theaters}>
      {children}
    </ContextTheaters.Provider>
  );
};
