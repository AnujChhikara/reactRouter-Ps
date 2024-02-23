import React from 'react'
import EventForm from '../components/EventForm'

function NewEventPage() {
  return (
    <div>
      <EventForm method='POST'/>
    </div>
  )
}

export default NewEventPage;

