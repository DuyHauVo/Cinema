import { collection, onSnapshot } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { db } from "../../Services/Config_Firebase";

export const ContextUsers = createContext([]);

export const UserConetxt = ({ children }) => {
  const [listUsers, setUsers] = useState([]);
  const userCollection = collection(db, "accounts");
  useEffect(() => {
    const unsubscribe = onSnapshot(userCollection, (snapshot) => {
      const UsersList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(UsersList);
    });
    return () => unsubscribe();
  }, []);

  return (
    <ContextUsers.Provider value={listUsers}>{children}</ContextUsers.Provider>
  );
};
