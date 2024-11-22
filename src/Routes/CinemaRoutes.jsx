import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Client/Home";
import Movie from "../Pages/Client/Movie";
import Region from "../Pages/Client/Region";
import Discount from "../Pages/Client/Support/Discount";
import Helps from "../Pages/Client/Support/Helps";
import Menber from "../Pages/Client/Menber";
import Contact from "../Pages/Client/Support/Contact";
const router = [
  {
    id: 1,
    path: "/",
    Component: Home,
  },
  {
    id: 2,
    path: "/phim",
    Component: Movie,
  },
  {
    id: 3,
    path: "/lichchieu",
    Component: Region,
  },
  {
    id: 4,
    path: "/uudai",
    Component: Discount,
  },
  {
    id: 5,
    path: "/hotrokhachang",
    Component: Helps,
  },
  {
    id: 6,
    path: "/lienhe",
    Component: Contact,
  },
  {
    id: 7,
    path: "/thanhvien",
    Component: Menber,
  },
];
function CinemaRoutes(props) {
  return (
    <div>
      <Routes>
        {router.map((element) => (
          <Route
            key={element.id}
            path={element.path}
            element={<element.Component />}
          />
        ))}
      </Routes>
    </div>
  );
}

export default CinemaRoutes;
