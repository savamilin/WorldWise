/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const UserAutent = createContext();
const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AutProvider({ children }) {
  // eslint-disable-next-line no-unused-vars
  // const navigation = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(FAKE_USER);
  // eslint-disable-next-line no-unused-vars
  const [isAutent, setIsAutent] = useState(false);
  // eslint-disable-next-line no-unused-vars
  function login(email, password) {
    console.log(email, password);
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      setIsAutent(true);
    console.log("context", isAutent);
  }

  function logout() {
    setIsAutent(false);
  }
  return (
    <UserAutent.Provider
      value={{
        user,
        isAutent,
        login,
        logout,
      }}
    >
      {children}
    </UserAutent.Provider>
  );
}

function useUser() {
  const context = useContext(UserAutent);
  if (context === undefined) throw new Error("Context is outside of Provider");
  return context;
}

export { AutProvider, useUser };
