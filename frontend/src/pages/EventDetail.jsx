import { json, useRouteLoaderData, redirect } from "react-router-dom";

import EventItem from "../components/EventItem";
import getToken from "../util/auth";

export default function EventDetail() {
  const data = useRouteLoaderData("event-detail");

  return (
    <>
      <EventItem event={data.event} />
    </>
  );
}

export async function loader({ request, params }) {
  const id = params.eventId;
  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch events list data" },
      { status: 500 }
    );
  } else {
    return response;
  }
}

export async function action({ request, params }) {
  console.log(request);
  const eventId = params.eventId;
  const token = getToken();
  const response = await fetch("http://localhost:8080/events/" + eventId, {
    method: request.method,
    headers: {
      Authorization: "bearer " + token,
    },
  });

  if (!response.ok) {
    throw json({ message: "Could not delete event" }, { status: 500 });
  }
  return redirect("/events");
}
