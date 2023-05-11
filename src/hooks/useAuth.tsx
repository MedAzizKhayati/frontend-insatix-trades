import { useState } from "react";

function getTokenfromLocalStorage() {
  return localStorage.getItem("token");
}

export default function useAuth() {
  const [token, setToken] = useState<any>(getTokenfromLocalStorage);
  const [user, setUser] = useState<any>(null);

  return !!token;
}
