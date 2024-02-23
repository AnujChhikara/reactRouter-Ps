import React, { Suspense } from 'react'
import EventItem from '../components/EventItem'
import {useRouteLoaderData, json, redirect, defer, Await } from 'react-router-dom';
import EventsList from '../components/EventsList';

function EventDetailPage() {
  const {event, events} = useRouteLoaderData('event-details')

  return (
    <>
    <Suspense fallback={<div style={{textAlign: 'center'}}>Loading...</div>}>
    <Await resolve={event}>
     { (loadedEvent ) => <EventItem event={loadedEvent} />
    }
    </Await>
    </Suspense>
    <Suspense fallback={<div style={{textAlign: 'center'}}>Loading...</div>}>
    <Await resolve={events}>
    { (loadedEvents ) => <EventsList events={loadedEvents} />
    }
    </Await></Suspense>
    
    </>
  )
}

export default EventDetailPage;

async function loadEvent(id) {
  const response = await fetch('http://localhost:8080/events/' + id);
  if(!response.ok){
       throw json({message: 'Could not fetch details for selected event.'},
       {status: 500})
  }
   else{
   const resData = await response.json()
   return resData.event
  }

}


async function loadEvents(){
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    
 throw json(
                {message: 'Could not fetch events..'},
                { status: 500})
  
  } else {
    const resData = await response.json();
    return resData.events
  }
}

export async function loader({request, params}){
  
    const id = params.eventId
   return defer({
    event: await loadEvent(id),
    events:loadEvents()
   })

}

export async function action ({request, params}){
  
  const id = params.eventId
 const response = await fetch('http://localhost:8080/events/' + id, {
  method: request.method
 })
 if(!response.ok){
  throw json({message: 'Could not delete event.'},
  {status: 500})
}
return redirect('/events')
}