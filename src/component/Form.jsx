/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { UseUrlPosition } from "../hook/useURLPosition";
import DatePicker from "react-datepicker";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCitiies } from "../context/CitiesContext";

function Form() {
  const navigation = useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [positionLoading, setPositonLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [lat, lng] = UseUrlPosition();
  const { postCity, isLoading } = useCitiies();

  useEffect(
    function () {
      async function getCityPosition() {
        try {
          setPositonLoading(true);
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          console.log(data);
          if (!data.countryCode) throw new Error("Please select a city");
          else setErrorMessage(null);
          if (!lat || !lng) return;
          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
        } catch (error) {
          setErrorMessage(error.message);
        } finally {
          setPositonLoading(false);
        }
      }

      getCityPosition();
    },
    [lat, lng]
  );

  if (positionLoading) return <Spinner />;
  if (errorMessage) return <Message message={errorMessage} />;

  async function handlerSubmit(e) {
    e.preventDefault();
    console.log("test");

    const newCity = {
      cityName,
      country,
      date,
      notes,
      position: { lat, lng },
    };
    await postCity(newCity);
    console.log(newCity);
    navigation("/app/cites");
  }

  return (
    <form
      className={`${styles.form} ${isLoading ? `${styles.loading}` : ""}`}
      onSubmit={handlerSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          selected={date}
          onChange={(data) => setDate(data)}
          dateFormat="dd/mm/yyyy"
          id="date"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Button
          type="back"
          onClick={(e) => {
            e.preventDefault();
            navigation(-1);
          }}
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
