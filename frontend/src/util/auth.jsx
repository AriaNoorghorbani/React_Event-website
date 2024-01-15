import { redirect } from "react-router-dom";

export default function getToken() {
  const token = localStorage.getItem("token");
  return token;
}

export function tokenLoader() {
  return getToken();
}

export function tokenDuration() {
  const storedExpiration = localStorage.getItem("expiration");
  const expiration = new Date(storedExpiration);
  const now = new Date();
  const duration = expiration.getTime() - now.getTime();
  return duration;
}

export function checkAuthLoader() {
  const token = getToken();

  if (!token) {
    return redirect("/auth");
  }

  const duration = tokenDuration();
  if (duration < 0) {
    return "EXPIRED";
  }

  return null;
}
