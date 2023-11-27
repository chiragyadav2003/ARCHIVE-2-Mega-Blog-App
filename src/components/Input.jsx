// designing a common input component
import React,{useId} from 'react'

// **  m-1 of using forwardRef hook
// here ref is the refernce from the parent component, parent component
// will pass the refrnce using forward ref hook while calling the component


const Input = React.forwardRef( function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref){
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label 
            className='inline-block mb-1 pl-1' 
            htmlFor={id}>
                {label}
            </label>
            }

            {/* in input box reference from the parent component will be passed to child component */}
            {/* this ref hook will connect parent component to this input */}
            <input
            type={type}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            ref={ref}
            {...props}
            id={id}
            />
        </div>
    )
})

export default Input
