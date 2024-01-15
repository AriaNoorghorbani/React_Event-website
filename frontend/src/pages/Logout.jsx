import { redirect } from "react-router-dom";

export default function () {
  return;
}

export function action() {
  localStorage.removeItem("token");
  // localStorage.removeItem("expiration");
  return redirect("/");
}
