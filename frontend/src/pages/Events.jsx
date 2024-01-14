import { Suspense } from "react";
import { Await, defer, json, useLoaderData } from "react-router-dom";

import EventsList from "../components/EventsList";

export default function EventsPage() {
  const data = useLoaderData();

  const events = data.events;

  return (
    <Suspense fallback={<p>Is loading...</p>}>
      <Await resolve={events}>
        {(eventLoader) => <EventsList events={eventLoader} />}
      </Await>
    </Suspense>
  );
}

async function eventLoader() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    throw json({ message: "An Error occurred" }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export function loader() {
  return defer({
    events: eventLoader(),
  });
}
