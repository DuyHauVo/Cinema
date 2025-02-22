import React, { useContext, useState } from "react";
import "../../Styles/Home.css";
import { useParams } from "react-router-dom";
import Header from "../../Components/Header";
import Footer_home from "../../Components/Footer_home";

import CinemaRoutes from "../../Routes/CinemaRoutes";
import Login from "./Login/Login";
import Register from "./Login/Register";
import Forgot_PW from "./Login/Forgot_PW";

const products = [
  {
    id: 1,
    title: "Sản phẩm 1",
    image:
      "https://firebasestorage.googleapis.com/v0/b/uog-movie-website.appspot.com/o/Pictures%2Fsliderent%2Fchichiemem.jpg?alt=media&token=12ce61c6-f0e0-428c-8c3a-54eb5682d4dd",
    price: "100,000 VND",
  },
  {
    id: 2,
    title: "Sản phẩm 2",
    image:
      "https://firebasestorage.googleapis.com/v0/b/uog-movie-website.appspot.com/o/Pictures%2Fsliderent%2Fchichiemem.jpg?alt=media&token=12ce61c6-f0e0-428c-8c3a-54eb5682d4dd",
    price: "200,000 VND",
  },
  {
    id: 3,
    title: "Sản phẩm 3",
    image:
      "https://firebasestorage.googleapis.com/v0/b/uog-movie-website.appspot.com/o/Pictures%2Fsliderent%2Fchichiemem.jpg?alt=media&token=12ce61c6-f0e0-428c-8c3a-54eb5682d4dd",
    price: "300,000 VND",
  },
  {
    id: 3,
    title: "Sản phẩm 3",
    image:
      "https://firebasestorage.googleapis.com/v0/b/uog-movie-website.appspot.com/o/Pictures%2Fsliderent%2Fchichiemem.jpg?alt=media&token=12ce61c6-f0e0-428c-8c3a-54eb5682d4dd",
    price: "300,000 VND",
  },
];
function HomeRouter(props) {
  const [show_menu, setShow_menu] = useState(false);
  const [open_Login, setOpen_Login] = useState(false);
  const [open_Register, setOpen_Register] = useState(false);
  const [open_Forgot_Password, setOpen_Forgot_Password] = useState(false);
  const { id, time } = useParams();
  return (
    <div className={`nen ${show_menu ? "bg" : "bg-white"}`}>
      <Header
        setShow_menu={setShow_menu}
        show_menu={show_menu}
        setOpen_Login={setOpen_Login}
      />
      <Login
        open_Login={open_Login}
        setOpen_Login={setOpen_Login}
        setOpen_Register={setOpen_Register}
        setOpen_Forgot_Password={setOpen_Forgot_Password}
      />
      <Register
        open_Register={open_Register}
        setOpen_Register={setOpen_Register}
        setOpen_Login={setOpen_Login}
      />
      <Forgot_PW
        open_Forgot_Password={open_Forgot_Password}
        setOpen_Forgot_Password={setOpen_Forgot_Password}
        setOpen_Login={setOpen_Login}
      />
      <CinemaRoutes />

      {/* <Footer_home>
        {id && time ? <div className="h-[50vh]"></div> : null}
      </Footer_home> */}
    </div>
  );
}

export default HomeRouter;
