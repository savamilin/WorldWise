/* eslint-disable no-unused-vars */

import style from "./Button.module.css";

/* eslint-disable react/prop-types */
export default function Button({ children, onClick, type }) {
  return (
    <button className={`${style.btn} ${style[type]}`} onClick={onClick}>
      {children}
    </button>
  );
}
