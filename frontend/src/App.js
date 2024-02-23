import { createBrowserRouter, RouterProvider} from 'react-router-dom';

import HomePage from './Pages/HomePage';
import EventsPage from './Pages/EventsPage';
import EventDetailpage, {action as deleteEventAction} from './Pages/EventDetailPage';
import EditEventPage from './Pages/EditEventPage';
import NewEventPage from './Pages/NewEventPage'
import RootLayout from './components/RootLayout';
import Error from './components/Error';
import EventsRoot from './Pages/EventsRoot';
import { loader as eventsLoader } from './Pages/EventsPage';
import {loader as eventDetailLoader} from './Pages/EventDetailPage'
import {action as manipulateEventAction} from './components/EventForm'
import NewsletterPage, { action as newsletterAction } from './Pages/Newsletter';

const router = createBrowserRouter([
  {path: '/' ,
   element: <RootLayout/>,
   errorElement: <Error/>,
  children: [
    {index: true , element: <HomePage/>},
    {path: 'events', element: <EventsRoot/>, children: [

      {index: true , element: <EventsPage/>, 
      loader: 
       eventsLoader},
       {path: ':eventId',
       id: 'event-details',
       loader: eventDetailLoader,
      children: [
        {index: true , element: <EventDetailpage/>, action: deleteEventAction},
        {path: 'edit' , element: <EditEventPage/>, action: manipulateEventAction}
      ]}
      ,
      {path: 'new' , element: <NewEventPage/>, action : manipulateEventAction},

    ]},
    {
      path: 'newsletter',
      element: <NewsletterPage />,
      action: newsletterAction,
    },
    

  ]},
])
 

function App() {
  return <RouterProvider router={router}/>
}

export default App;
