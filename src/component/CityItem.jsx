/* eslint-disable react/prop-types */

import style from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { useCitiies } from "../context/CitiesContext";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

export default function CityItem({ city }) {
  const { curentCity, deleteCity } = useCitiies();
  console.log("ther is city", city);

  const { cityName, date, id, position } = city;

  function handlerDeleteCity(e) {
    e.preventDefault();
    deleteCity(id);
  }
  return (
    <li>
      <Link
        className={`${style.cityItem} ${
          curentCity.id === id ? style["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <h3 className={style.name}> {cityName}</h3>
        <time className={style.date}>{formatDate(date)}</time>
        <button className={style.deleteBtn} onClick={handlerDeleteCity}>
          &times;
        </button>
      </Link>
    </li>
  );
}
