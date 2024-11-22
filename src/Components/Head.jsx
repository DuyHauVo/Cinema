import React, { useState } from "react";
import { Link } from "react-router-dom";
import { menu_home } from "../Utils/Contants";

function Head({setShow_menu,show_menu}) {
  const [sidebar, setSidebar] = useState(false);
 
  return (
    <>
      <div className="header">
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
