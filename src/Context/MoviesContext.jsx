import { collection, onSnapshot } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { db } from "../Services/Config_Firebase";

export const ContextMovies = createContext([]);

export const MoviesContext = ({ children }) => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const moviesColection = collection(db, "movies");

    // tạo lắng nghe realtime cho doc movies
    const unsubscribe = onSnapshot(moviesColection, (snapshot) => {
      const moviesList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMovies(moviesList);
    });
    // huỷ lắng nghe bằng cách gọi lại hàm unsubscribe
    return () => unsubscribe();
  }, []);

  return (
    <ContextMovies.Provider value={movies}>{children}</ContextMovies.Provider>
  );
};
