import React, { createContext, useState, useEffect } from "react";
import { db } from "../Services/Config_Firebase";
import { collection, onSnapshot } from "firebase/firestore";
export const ContextBooking = createContext();
const inner = { listChairs: [], combo: [], handleRooms: "" };
export const BookingContext = ({ children }) => {
  const [booking, setBooking] = useState(inner);
  const [rooms, setRooms] = useState("");

  return (
    <ContextBooking.Provider value={{ booking, setBooking }}>
      {children}
    </ContextBooking.Provider>
  );
};
