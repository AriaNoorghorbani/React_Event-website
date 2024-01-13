import { redirect } from "react-router-dom";
import EventForm from "../components/EventForm";

export default function NewEvent() {
  return <EventForm />;
}

export async function action({ request, params }) {
  const data = await request.formData();

  const eventData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };

  const response = await fetch("http://localhost:8080/events", {
    method: "POST",
    body: JSON.stringify(eventData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return redirect("/events");
}
