import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./pages/RootLayout";
import NewEvent from "./pages/NewEvent";
import Events, { loader as eventsLoader } from "./pages/Events";
import EventDetail, {
  loader as eventDetailLoader,
  action as eventDeleteAction,
} from "./pages/EventDetail";
import EditEvent from "./pages/EditEvent";
import Home from "./pages/Home";
import EventLayout from "./pages/EventLayout";
import Error from "./pages/Error";
import { action as manipulateEvent } from "./components/EventForm";
import NewsletterPage, { action as newsletterAction } from "./pages/Newsletter";
import Authentication, { action as authAction } from "./pages/Authentication";
import { action as logoutAction } from "./pages/Logout";
import { tokenLoader } from "./util/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    loader: tokenLoader,
    id: "token",
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "events",
        element: <EventLayout />,
        children: [
          {
            index: true,
            element: <Events />,
            loader: eventsLoader,
          },
          {
            path: ":eventId",
            id: "event-detail",
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetail />,
                action: eventDeleteAction,
              },
              {
                path: "edit",
                element: <EditEvent />,
                action: manipulateEvent,
              },
            ],
          },
          {
            path: "new",
            element: <NewEvent />,
            action: manipulateEvent,
          },
        ],
      },
      { path: "auth", element: <Authentication />, action: authAction },
      {
        path: "newsletter",
        element: <NewsletterPage />,
        action: newsletterAction,
      },
      { path: "logout", action: logoutAction },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
