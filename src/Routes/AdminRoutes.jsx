import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
// import { Routers, Route } from "react-router-dom";
import Dashboard from "../Pages/Admin/Dashboard";
import Categories from "../Pages/Admin/Categories";
import Movies from "../Pages/Admin/Movies/Movies";
import Movie_Screening from "../Pages/Admin/Movies/Movie_Screening";
import Performer from "../Pages/Admin/Movies/Performer";
import Booking from "../Pages/Admin/Services/Booking";
import Servics_food from "../Pages/Admin/Services/Servics_food";
import Chair from "../Pages/Admin/Theaters/Chair";
import Type_Chair from "../Pages/Admin/Theaters/Type_Chair";
import Location from "../Pages/Admin/Rooms/Location";
import Region from "../Pages/Admin/Rooms/Region";
import Users from "../Pages/Admin/User/Users";
import Lever_Member from "../Pages/Admin/User/Lever_Member";
import Theater from "../Pages/Admin/Theater";
import Rating from "../Pages/Admin/Rating";
import Room from "../Pages/Admin/Rooms/Room";

function AdminRoutes(props) {
  const elements = [
    {
      id: 1,
      path: "/",
      Component: Dashboard,
    },
    {
      id: 2,
      path: "/categories",
      Component: Categories,
    },
    {
      id: 3,
      path: "/movies",
      Component: Movies,
    },
    {
      id: 4,
      path: "/movie_screening",
      Component: Movie_Screening,
    },
    {
      id: 5,
      path: "/performer",
      Component: Performer,
    },
    {
      id: 6,
      path: "/booking",
      Component: Booking,
    },
    {
      id: 7,
      path: "/service_Food",
      Component: Servics_food,
    },
    {
      id: 8,
      path: "/chair",
      Component: Chair,
    },
    {
      id: 9,
      path: "/type_chair",
      Component: Type_Chair,
    },
    {
      id: 10,
      path: "/region",
      Component: Region,
    },
    {
      id: 11,
      path: "/users",
      Component: Users,
    },
    {
      id: 12,
      path: "/lever_member",
      Component: Lever_Member,
    },
    {
      id: 13,
      path: "/theater",
      Component: Theater,
    },
    {
      id: 14,
      path: "/rating",
      Component: Rating,
    },
    {
      id: 15,
      path: "/location",
      Component: Location,
    },
    {
      id: 16,
      path: "/room",
      Component: Room,
    },
  ];

  return (
    <>
      <Routes>
        {elements.map((element) => (
          <Route
            key={element.id}
            path={element.path}
            element={<element.Component />}
          />
        ))}
      </Routes>
    </>
  );
}

export default AdminRoutes;
