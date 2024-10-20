import React, { useState } from "react";
import { Link } from "react-router-dom";
import AdminRoutes from "../../Routes/AdminRoutes";
import { Outlet } from "react-router-dom";
import { menu } from "../../Utils/Contants";
function AdminDashboard(props) {
  const [hidden, setHidden] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [child, setChild] = useState(null);
  const [arow, setArow] = useState(false);
  // console.log(menu);
  const handleClick = (element) => {
    // console.log(element.id);
    if (element.id === child) {
      setChild(null);
    } else {
      setChild(element.id);
    }
  };
  return (
    <div >
      <div className="admin md:flex">
        <div className="left md:h-screen p-4 md:pt-10 md:pe-10 ">
          <div
            className={`md:mb-4 flex items-center justify-center ${
              sidebar ? "ms-5" : ""
            }`}
          >
            <i
              class={`fa-solid fa-bars ${sidebar ? "xoay" : "xoayo"}`}
              onClick={() => setSidebar(!sidebar)}
            ></i>
            <img
              class={`h-4 w-44 ms-3 ${sidebar ? "" : "hidden"}`}
              src="https://demo.bootstrapdash.com/star-admin2-free/template/images/logo.svg"
              alt="Your Company"
            />
          </div>
          <ul className={`md:block  ${sidebar ? "" : "hidden"}`}>
            <Link to={"/"} className="Li">
              <i class="fa-solid fa-table-columns"></i>
              <p className={sidebar ? "" : "hidden"}>Dashboard</p>
            </Link>
            <h3 className={`font-semibold text-lg ${sidebar ? "" : "hidden"}`}>
              UI Elements
            </h3>
            <Link to={"/categories"} className="Li">
              <i class="fa-brands fa-elementor"></i>
              <p className={sidebar ? "" : "hidden"}>Categories</p>
            </Link>
            <h3 className={`font-semibold text-lg ${sidebar ? "" : "hidden"}`}>
              Forms and Datas
            </h3>
            {menu.map((element, index) => (
              <>
                <div>
                  <Link className="Li" onClick={() => handleClick(element)}>
                    <i class={element.icon}></i>
                    <p className={`text-sm ${sidebar ? "" : "hidden"}`}>
                      {element.title}
                    </p>
                    <i
                      class={`fa-solid fa-chevron-right text-xs ml-auto ${
                        sidebar ? "" : "hidden"
                      }`}
                    ></i>
                  </Link>
                  <div className={child == element.id ? "" : "hidden"}>
                    {element.items.map((item) => (
                      <>
                        <Link to={item.path} className="Li">
                          <i class={item.icon}></i>
                          <p className={`text-sm ${sidebar ? "" : "hidden"}`}>
                            {item.title}
                          </p>
                        </Link>
                      </>
                    ))}
                  </div>
                </div>
              </>
            ))}

            <h3 className={`font-semibold text-lg  ${sidebar ? "" : "hidden"}`}>
              Pages
            </h3>
            <Link to={"/theater"} className="Li">
              <i class="fa-solid fa-video"></i>
              <p className={sidebar ? "" : "hidden"}>Theater</p>
            </Link>
            <Link to={"/rating"} className="Li">
              <i class="fa-solid fa-star"></i>
              <p className={sidebar ? "" : "hidden"}>Rating</p>
            </Link>
          </ul>
        </div>
        <div className="right md:flex-1">
          <div className="right-header flex justify-between pt-9">
            <div className="ml-4">
              <h1 className="text-2xl flex">
                <p className="text-slate-400 ">Good moring, </p>
                <strong className="text-black ml-1"> Duy Hậu</strong>
              </h1>
              <h3>
                <p className="text-slate-400">
                  Your performance summary this week
                </p>
              </h3>
            </div>
            <div className="flex">
              <div className="text-2xl mx-3 p-1 w-10 h-10 text-center  hover:text-white hover:bg-slate-700 rounded-full">
                <i class="fa-solid fa-magnifying-glass"></i>
              </div>
              <div className="text-2xl mx-3 p-1 w-10 h-10 text-center hover:text-white hover:bg-slate-700 rounded-full">
                <i class="fa-regular fa-bell"></i>
              </div>

              <div className="text-2xl mx-3 p-1 w-10 h-10 text-center hover:text-white hover:bg-slate-700 rounded-full">
                <i class="fa-regular fa-envelope"></i>
              </div>
              <div class="relative ml-3 mr-5">
                <div>
                  <button
                    type="button"
                    class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={() => setHidden(!hidden)}
                  >
                    <img
                      class="h-10 w-10 rounded-full"
                      src="https://scontent.fsgn5-13.fna.fbcdn.net/v/t39.30808-1/448510601_1909189019530161_7770431781770535508_n.jpg?stp=dst-jpg_s200x200&_nc_cat=104&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=l5C1B_mjaZ4Q7kNvgENr0Xs&_nc_ht=scontent.fsgn5-13.fna&_nc_gid=AIEU8zIETijrxsW2Jw5RhiI&oh=00_AYCdITX7RdiSIWovj0YQtfHHvv2PL9VeF03iwqrHtR40cw&oe=66E36A4B"
                      alt=""
                    />
                  </button>
                </div>

                <div
                  class={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
                    hidden ? "" : "hidden"
                  }`}
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabindex="-1"
                >
                  <a
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabindex="-1"
                    id="user-menu-item-0"
                  >
                    Your Profile
                  </a>
                  <a
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabindex="-1"
                    id="user-menu-item-1"
                  >
                    Settings
                  </a>
                  <a
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabindex="-1"
                    id="user-menu-item-2"
                  >
                    Sign out
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="right-main">
            <AdminRoutes />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
