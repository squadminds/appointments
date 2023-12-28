import React from 'react'

function ErrorPage() {
  return (
    <div className='errorPage'>
   <div className='innerError'>
    <span style={{color:"white",fontSize:"44px",borderRight:"5px solid white",padding:"44px"}}>404</span>  <span style={{color:"white",fontSize:"44px",padding:"44px"}}> This page could not be found.</span>
   </div>
    </div>
  )
}

export default ErrorPage
