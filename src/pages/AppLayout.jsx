import Sidebar from "../component/Sidebar";
import Map from "../component/Map";
import style from "./AppLayout.module.css";
import User from "../component/User";

export default function AppLayout() {
  return (
    <div className={style.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}
