/* eslint-disable react/prop-types */
import style from "./CityList";
import CountryItem from "./CountryItem";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCitiies } from "../context/CitiesContext";

export default function Country() {
  const { citys: conutys, isLoading } = useCitiies();
  console.log("in cityList app", conutys);
  if (isLoading) return <Spinner />;
  if (!conutys.length)
    return (
      <Message message="add your frist city by clicking on a city on time map" />
    );

  const uniquCounty = conutys.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);
  return (
    <div>
      <ul className={style.countryList}>
        {uniquCounty?.map((conuty) => (
          <CountryItem country={conuty} key={conuty.id} />
        ))}
      </ul>
    </div>
  );
}
