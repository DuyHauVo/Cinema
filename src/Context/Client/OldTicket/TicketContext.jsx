import { collection, onSnapshot } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { db } from "../../../Services/Config_Firebase";

export const ContextTicket = createContext([]);

export const TicketContext = ({ children }) => {
  const [oldTicket, setOldTicket] = useState([]);
  useEffect(() => {
    const ticketColection = collection(db, "createTicket");

    // đặt lắng nghe
    const unsubscribe = onSnapshot(ticketColection, (snapshot) => {
      const ticketList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOldTicket(ticketList);
    });
    // huỷ lắng nghe
    return () => unsubscribe();
  }, []);
  return (
    <ContextTicket.Provider value={oldTicket}>
      {children}
    </ContextTicket.Provider>
  );
};
