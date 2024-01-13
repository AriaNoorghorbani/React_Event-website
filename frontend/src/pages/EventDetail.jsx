import { useParams, json, useLoaderData } from "react-router-dom";

import EventItem from "../components/EventItem";

export default function EventDetail() {
  const data = useLoaderData();

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
