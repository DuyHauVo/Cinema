import { collection, onSnapshot } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { db } from "../Services/Config_Firebase";
export const ContextMovie_Screening = createContext([]);

export const Movie_ScreeningContext = ({ children }) => {
  const [listMovie_Screening, setListMovie_Sccreening] = useState([]);
  useEffect(() => {
    const movie_ScreeningCollection = collection(db, "movie_screening");
    const unsubscribe = onSnapshot(movie_ScreeningCollection, (snapshot) => {
      const movie_ScreeningList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setListMovie_Sccreening(movie_ScreeningList);
    });
    return () => unsubscribe();
  }, []);
  return (
    <ContextMovie_Screening.Provider value={listMovie_Screening}>
      {children}
    </ContextMovie_Screening.Provider>
  );
};
