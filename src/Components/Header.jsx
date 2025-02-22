import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import { menu_home } from "../Utils/Contants";
import { ContextLogin } from "../Context/LoginContext";
import logo from "../Assets/logo/hau.png";

function Header({ setShow_menu, show_menu, setOpen_Login }) {
  const [open, setOpen] = React.useState(false);
  const [avata, setAvata] = useState(false);

  const { isLogin, logout } = useContext(ContextLogin);

  const toggleDrawer = (newOpen) => () => {
    setOpen_Login(newOpen);
  };
  const handleClickOpen = () => {
    setOpen_Login(true);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {menu_home.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <Link className="page_home md:ms-5" to={text.path}>
                <ListItemText primary={text.title} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <div>
      <div className="header">
        <div className="header-main flex bg-gray-900 justify-around items-center">
          <div className="w-[100px] md:w-[150px] p-4">
            <Link to="/">
              <img className="w-[80px] h-[80px] " src={logo} alt="" />
            </Link>
          </div>
          <div className="menu-page flex">
            <ul
              className={`text-white my-auto mr-6 ${
                show_menu ? "show-menu" : ""
              }`}
            >
              <div className="flex p-5 md:hidden">
                <div className="">
                  <img
                    src="http://www.riocinemas.vn/Content/img/logo.png"
                    alt=""
                  />
                </div>
                <i
                  class="fa-solid fa-xmark "
                  onClick={() => setShow_menu(null)}
                ></i>
              </div>
              {menu_home.map((element, index) => (
                <>
                  <Link
                    className="page_home md:ms-4 md:text-sm lg:text-lg"
                    to={element.path}
                  >
                    {element.title}
                  </Link>
                </>
              ))}
            </ul>
            {isLogin ? (
              <div className="relative hover:cursor-pointer">
                <img
                  className="w-10 h-10 rounded-full"
                  src={
                    isLogin?.imgUrl
                      ? isLogin?.imgUrl
                      : "https://tse2.mm.bing.net/th?id=OIP.Gfp0lwE6h7139625a-r3aAHaHa&pid=Api&P=0&h=220"
                  }
                  alt=""
                  onClick={() => setAvata(!avata)}
                />
                <ul
                  className={`bg-white absolute w-32 mt-2 left-0 ${
                    avata ? "" : "hidden"
                  }`}
                  style={{
                    boxShadow: "rgba(255, 255, 255, 0.5) 0px 5px 15px",
                    borderRadius: "10px",
                  }}
                >
                  <li className="p-2 hover:bg-black hover:text-white">
                    Seting
                  </li>
                  <Link to={"/about_Us"}>
                    <li className="p-2 hover:bg-black hover:text-white">
                      About Us
                    </li>
                  </Link>
                  <li
                    onClick={logout}
                    className="p-2 hover:bg-black hover:text-white"
                  >
                    Log Out
                  </li>
                </ul>
              </div>
            ) : (
              <i
                onClick={handleClickOpen}
                class="fa-solid fa-right-to-bracket text-white my-auto text-xl ml-3 icon"
              ></i>
            )}
          </div>
          <i
            class={`fa-solid fa-bars text-white text-xl md:hidden`}
            onClick={toggleDrawer(true)}
          ></i>
        </div>
      </div>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}

export default Header;
