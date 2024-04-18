/* eslint-disable react/prop-types */
import style from "./CityList.module.css";
import CityItem from "./CityItem";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCitiies } from "../context/CitiesContext";

export default function CityList() {
  const { citys, isLoading } = useCitiies();
  console.log(useCitiies());
  console.log("in cityList app", citys);
  if (isLoading) return <Spinner />;
  if (!citys.length)
    return (
      <Message message="add your frist city by clicking on a city on time map" />
    );
  return (
    <div>
      <ul className={style.cityList}>
        {citys?.map((city) => (
          <CityItem city={city} isLoading={isLoading} key={city.id} />
        ))}
      </ul>
    </div>
  );
}
