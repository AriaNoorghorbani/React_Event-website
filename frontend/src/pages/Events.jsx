import { useLoaderData } from 'react-router-dom';

import EventsList from '../components/EventsList';

export default function EventsPage() {

const events = useLoaderData()

  return <EventsList events={events} />
}

