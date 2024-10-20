import React, { useState } from "react";
import Head from "../../Components/Head";
import "../../Styles/Home.css"


function Home(props) {
  const [show_menu, setShow_menu] = useState(false);
  return (
    <div className={`nen ${show_menu ? "bg" : "bg-white"}`}>
      <Head setShow_menu={setShow_menu} show_menu={show_menu}/>
    </div>
  );
}

export default Home;
