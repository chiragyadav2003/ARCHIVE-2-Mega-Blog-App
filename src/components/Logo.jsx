import React from 'react'

// TODO:handle image section Headers,we need to import image

function Logo({width = '100px'}) {
  return (
    <div>
      <img
        src="https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="logo image"
        // height={300}
        width={150}
        className=' rounded-lg shadow-2xl '
      />
    </div>
  )
}

export default Logo