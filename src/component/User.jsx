import styles from "./User.module.css";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function User() {
  const { user, logout } = useUser();
  const navigation = useNavigate();

  function handleClick() {
    logout();
    navigation("/");
  }

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;
