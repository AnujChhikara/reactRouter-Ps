import React from 'react'
import PageContent from './PageContent'
import { useRouteError } from 'react-router-dom'
import MainNavigation from './MainNavigation'

function Error() {
  const error = useRouteError()
 let title = "An Error Occurred!"
 let message = "Something went wrong!"

 if(error.status === 500){
   message = error.data.message;
 }

 if(error.status === 404){
  title="Not Found!"
  message="Could not found resources or page."
 }

  return (
    <div >
      <MainNavigation/>
      <PageContent title={title}>
        {message}
        </PageContent></div>
  )
}

export default Error