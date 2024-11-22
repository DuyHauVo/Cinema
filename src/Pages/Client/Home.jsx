import React, { useState } from "react";
import Head from "../../Components/Head";
import "../../Styles/Home.css";
import SlideHome from "./SlideShow/SlideHome";
import Search from "./Search/Search";

function Home(props) {
  const [show_menu, setShow_menu] = useState(false);
  return (
    <div className={`nen ${show_menu ? "bg" : "bg-white"}`}>
      <Head setShow_menu={setShow_menu} show_menu={show_menu} />
      <SlideHome />
      <div className="xl:mx-40  md:mx-20 mx-5">
          <Search />
      </div>
    </div>
  );
}

export default Home;
