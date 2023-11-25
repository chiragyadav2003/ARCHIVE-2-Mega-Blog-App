// designing a common button component
import React from 'react'

// children can also called as - btnText i.e, button text
// props - additional properties passed to the button component
function Button({
    children,
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',
    ...props
}) {
  return (
    <button
    type={type}
    className={`px-4 py-2 rounded-lg ${className} ${bgColor} ${textColor}`} 
    {...props} 
    >
        {children}
    </button>
  )
}

export default Button