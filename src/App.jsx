import logo from "./logo.svg";
import "./App.css";
import AdminRoutes from "./Routes/AdminRoutes";
import "animate.css";
import Main from "./Pages/Client/Main";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import Home from "./Pages/Client/Home";

function App() {
  return (
    <>
      <AdminDashboard />
      {/* <Home /> */}
    </>
  );
}

export default App;
