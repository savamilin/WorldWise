/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function ProtectedRouter({ children }) {
  const { isAutent } = useUser();
  const navigate = useNavigate();
  useEffect(
    function () {
      if (!isAutent) navigate("/");
    },
    [isAutent, navigate]
  );
  return isAutent ? children : null;
}
