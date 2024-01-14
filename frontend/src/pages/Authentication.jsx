import { json, redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";

export default function Authentication() {
  return <AuthForm />;
}

export async function action({ request }) {
  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };
  const searchParams = new URL(request.url).searchParams;
  let mode = searchParams.get("mode") || "login";

  // if (mode === "login" || mode === "signup") {
  //   mode = "login";
  // }

  const response = await fetch("http://localhost:8080/" + mode, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  const resData = await response.json();
  const token = resData.token;

  localStorage.setItem("token", token);

  return redirect("/");
}
