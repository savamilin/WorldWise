/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:9000";

function CitiesProvider({ children }) {
  const [citys, setCity] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [curentCity, setCurentCity] = useState({});
  useEffect(function () {
    async function getCitys() {
      try {
        setIsLoading(true);
        const respo = await fetch(`${BASE_URL}/cities`);
        const data = await respo.json();
        console.log(data);
        setCity(data);
      } catch {
        alert("There was an error");
      } finally {
        setIsLoading(false);
      }
    }

    getCitys();
  }, []);

  const getCity = useCallback(async function getCity(id) {
    try {
      setIsLoading(true);
      const respo = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await respo.json();
      console.log(data);
      setCurentCity(data);
    } catch {
      alert("There was an error");
    } finally {
      setIsLoading(false);
    }
  }, []);
  async function postCity(newCity) {
    try {
      setIsLoading(true);
      await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      setCity((city) => [...city, newCity]);
    } catch {
      alert("There was an error on post");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id) {
    try {
      setIsLoading(true);
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      setCity((city) => city.filter((c) => c.id !== id));
    } catch {
      alert("There was an error on delete");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        citys,
        isLoading,
        curentCity,
        getCity,
        postCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCitiies() {
  const content = useContext(CitiesContext);
  if (content === undefined)
    throw new Error(
      "cities context was useed ouside of cities Provider(children)"
    );
  return content;
}

export { CitiesProvider, useCitiies };
