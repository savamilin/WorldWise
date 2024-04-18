import { NavLink } from "react-router-dom";

import Logo from "./Logo";
import styles from "./PageNav.module.css";

export default function PageNav() {
  return (
    <div>
      <nav className={styles.nav}>
        <Logo />

        <ul>
          <li>
            <NavLink to="/pricing">pricing</NavLink>
          </li>
          <li>
            <NavLink to="/product">product</NavLink>
          </li>
          <li>
            <NavLink to="/login" className={styles.ctaLink}>
              login
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
