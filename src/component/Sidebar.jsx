import style from "./Sidebar.module.css";
import Logo from "./Logo";
import AppNav from "./AppNav";
import { Outlet } from "react-router-dom";
export default function Sidebar() {
  return (
    <div className={style.sidebar}>
      <Logo />
      <AppNav />

      <Outlet />

      <footer className={style.footer}>
        &copy; Copyright {new Date().getFullYear()} bu worldwise inc.
      </footer>
    </div>
  );
}
