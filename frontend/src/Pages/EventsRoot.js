import React from 'react'
import {Outlet} from 'react-router-dom'
import EventNavigation from '../components/EventsNavigation'
function EventsRoot() {
  return (
    <>
    <EventNavigation/>
    <Outlet/></>
  )
}

export default EventsRoot