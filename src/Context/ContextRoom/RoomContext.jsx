import { collection, onSnapshot } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { db } from "../../Services/Config_Firebase";

export const ContextRooms = createContext([]);

export const RoomContext = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    const roomsColection = collection(db, "rooms");
    const unsubscribe = onSnapshot(roomsColection, (snaphot) => {
      const RoomsList = snaphot.docs.map((data) => ({
        id: data.id,
        ...data.data(),
      }));
      setRooms(RoomsList);
    });
    return () => unsubscribe();
  }, []);

  return (
    <ContextRooms.Provider value={rooms}>{children}</ContextRooms.Provider>
  );
};
