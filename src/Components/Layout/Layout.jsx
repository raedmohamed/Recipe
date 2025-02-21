import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../SideBar/SideBar.jsx";
import style from "./Layout.module.scss";

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className={style.mainLayout}>
      <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`${style.rightSide} ${
          isSidebarOpen ? style.open : style.close
        }`}
      >
        <button className={style.menuBtn} onClick={toggleSidebar}>
          <i className="fa-solid fa-bars" />
        </button>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
