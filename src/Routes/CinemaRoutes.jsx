import React from "react";
import { Routes, Route } from "react-router-dom";
import Region from "../Pages/Client/Region";
import Discount from "../Pages/Client/Support/Discount";
import Helps from "../Pages/Client/Support/Helps";
import Menber from "../Pages/Client/Menber";
import Contact from "../Pages/Client/Support/Contact";
import Home from "../Pages/Client/HomePage/Home";
import Login from "../Pages/Client/Login/Login";
import Register from "../Pages/Client/Login/Register";
import Movie from "../Pages/Client/Products/Movie";
import Movie_Detail from "../Pages/Client/Products/Movie_Detail";
import Oder_ticket from "../Pages/Client/HomePage/Tickets/Oder_ticket";
import CompoService from "../Pages/Client/HomePage/Tickets/Services/CompoService";
import FilePay from "../Pages/Client/HomePage/Tickets/FilePay";
import About_Us from "../Pages/Client/User/About_Us";
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
  {
    id: 8,
    path: "/login",
    Component: Login,
  },
  {
    id: 7,
    path: "/register",
    Component: Register,
  },
  {
    id: 8,
    path: "/detail/:id",
    Component: Movie_Detail,
  },
  {
    id: 9,
    path: "/oder_ticket",
    Component: Oder_ticket,
  },
  {
    id: 10,
    path: "/composervice",
    Component: CompoService,
  },
  {
    id: 11,
    path: "/pay",
    Component: FilePay,
  },
  {
    id: 11,
    path: "/about_Us",
    Component: About_Us,
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
