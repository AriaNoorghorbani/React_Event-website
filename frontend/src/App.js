import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import MainNavigation from './components/MainNavigation'
import RootLayout from './pages/RootLayout';
import NewEvent from './pages/NewEvent'
import Events from './pages/Events'
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
            loader: async () => {
              const response = await fetch('http://localhost:8080/events');

              if (!response.ok) {
                // setError('Fetching events failed.');
              } else {
                const resData = await response.json();
                return resData.events
              }
            }
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
