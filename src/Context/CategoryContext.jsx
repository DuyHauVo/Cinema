import React, { createContext, useState, useEffect } from "react";
import { db } from "../Services/Config_Firebase";
import { collection, onSnapshot } from "firebase/firestore";
export const ContextCategories = createContext();

export const CategoryContext = ({ children }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const categoriesCollection = collection(db, "categories");

    // Đặt lắng nghe realtime cho bộ sưu tập Categories
    const unsubscribe = onSnapshot(categoriesCollection, (snapshot) => {
      const categoriesList = snapshot.docs.map(doc => ({
        id: doc.id, ...doc.data()
      }));
      setCategories(categoriesList);
    });

    // Hủy lắng nghe khi component bị hủy
    return () => unsubscribe();
  }, []);
  return (
    <ContextCategories.Provider value={categories}>
      {children}
    </ContextCategories.Provider>
  );
};
