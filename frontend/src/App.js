import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import RootLayout from './pages/RootLayout';
import NewEvent from './pages/NewEvent'
import Events, { loader as eventsLoader } from './pages/Events'
import EventDetail from './pages/EventDetail'
import EditEvent from './pages/EditEvent'
import Home from './pages/Home';
import EventLayout from './pages/EventLayout'

const router = createBrowserRouter([
  {
    path: '/', element: <RootLayout />, children: [
      { index: true, element: <Home /> },
      {
        path: 'events',
        element: <EventLayout />, children: [
          {
            index: true,
            element: <Events />,
            loader: eventsLoader
          },
          { path: ':eventId', element: <EventDetail /> },
          { path: 'new', element: <NewEvent /> },
          { path: ':eventId/edit', element: <EditEvent /> }
        ]
      },

    ]
  }
])


function App() {
  return <RouterProvider router={router} />;
}


export default App;
