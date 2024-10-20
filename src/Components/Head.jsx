import React, { useState } from "react";
import { Link } from "react-router-dom";
import { menu_home } from "../Utils/Contants";

function Head({setShow_menu,show_menu}) {
  const [sidebar, setSidebar] = useState(false);
 
  return (
    <>
      <div className="header ">
        <div className="header-top md:grid grid-cols-2">
          <div className="header-top-left grid-cols-1 flex justify-center items-center">
            <div className="contact flex items-center">
              <i class="fa-solid fa-phone mr-4"></i>
              <p>Call: 0357 55 83 50</p>
            </div>
            <div className="contact flex items-center ms-5">
              <i class="fa-solid fa-envelope mr-4"></i>
              <p> voduyhau272@gmail.com</p>
            </div>
          </div>
          <div className="header-top-right grid-cols-1 flex">
            <div className="icon">
              <i class="fa-brands fa-facebook pe-2"></i>
              <i class="fa-brands fa-youtube pe-2"></i>
              <i class="fa-brands fa-discord pe-2"></i>
              <i class="fa-brands fa-tiktok pe-2"></i>
            </div>
            <div>
              <img
                src="http://www.riocinemas.vn/Content/img/icons/app-1.png"
                alt=""
              />
            </div>
            <div>
              <img
                src="http://www.riocinemas.vn/Content/img/icons/app-2.png"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="header-main flex bg-slate-900 justify-around items-center">
          <div className="w-[100px] md:w-[150px]">
            <img src="http://www.riocinemas.vn/Content/img/logo.png" alt="" />
          </div>
          <div className="menu-page flex">
            <ul
              className={`text-white ${show_menu ? "show-menu" : "close-menu"}`}
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
                  <Link className="page_home md:ms-5" to={element.path}>
                    {element.title}
                  </Link>
                </>
              ))}
            </ul>
            <i class="fa-solid fa-user text-white text-lg"></i>
          </div>

          <i
            class={`fa-solid fa-bars text-white text-xl md:hidden `}
            onClick={() => setShow_menu(!show_menu)}
          ></i>
        </div>
      </div>
    </>
  );
}

export default Head;
