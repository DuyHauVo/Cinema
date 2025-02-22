import logo from "./logo.svg";
import "./App.css";
import AdminRoutes from "./Routes/AdminRoutes";
import "animate.css";
import AdminDashboard from "./Pages/Admin/AD_Dashboard/AdminDashboard";
import Home from "./Pages/Client/HomeRouter";
import { useContext, useEffect, useState } from "react";
import { ContextUsers } from "./Context/Client/UserConetxt";
import { ContextLogin } from "./Context/LoginContext";

function App() {
  const { isLogin } = useContext(ContextLogin);
  return (
    <div>
      {isLogin?.role === "admin" ? (
        <>
          <AdminDashboard />
        </>
      ) : (
        <>
          <Home />
        </>
      )}
    </div>
  );
}

export default App;
