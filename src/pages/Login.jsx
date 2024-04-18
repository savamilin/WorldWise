import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import PageNav from "../component/PageNav";
import Button from "../component/Button";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Login() {
  const navigation = useNavigate();
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  const { login, isAutent } = useUser();
  console.log(isAutent);
  function handlerSbmit(e) {
    e.preventDefault();
    login(email, password);
    console.log("radi");
  }

  useEffect(() => {
    if (isAutent) navigation("/app");
  }, [isAutent, navigation]);
  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handlerSbmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
