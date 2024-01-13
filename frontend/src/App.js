import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import RootLayout from './pages/RootLayout';
import NewEvent from './pages/NewEvent'
import Events, { loader as eventsLoader } from './pages/Events'
import EventDetail, { loader as eventDetailLoader, action as eventDeleteAction } from './pages/EventDetail'
import EditEvent from './pages/EditEvent'
import Home from './pages/Home';
import EventLayout from './pages/EventLayout'
import Error from './pages/Error';
import { action as manipulateEvent } from './components/EventForm'
import NewsletterPage, { action as newsletterAction } from './pages/Newsletter';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'events',
        element: <EventLayout />,
        children: [
          {
            index: true,
            element: <Events />,
            loader: eventsLoader,
          },
          {
            path: ':eventId',
            id: 'event-detail',
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetail />,
                action: eventDeleteAction,

              },
              {
                path: 'edit',
                element: <EditEvent />,
                action: manipulateEvent

              },
            ]
          },
          {
            path: 'new',
            element: <NewEvent />,
            action: manipulateEvent
          },
        ]
      },
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction,
      },
    ]
  }
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;