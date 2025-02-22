import { collection, onSnapshot } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { db } from "../../Services/Config_Firebase";

export const ContextNews = createContext([]);

export const NewContext = ({ children }) => {
  const [listNews, setListNews] = useState([]);
  useEffect(() => {
    const newCollection = collection(db, "news");
    const unsubscribe = onSnapshot(newCollection, (snapShot) => {
      const newsList = snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setListNews(newsList);
    });
    return () => unsubscribe();
  }, []);
  return (
    <ContextNews.Provider value={listNews}>{children}</ContextNews.Provider>
  );
};
