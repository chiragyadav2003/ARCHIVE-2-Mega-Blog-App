import React, {useId, forwardRef} from 'react'

// **  m-2 using forwardRef hook
//option will be an aray of options to be displayed in the select - active or inactive
function Select({
        options,
        label,
        className = '',
        ...props
    }, ref) {

        const id = useId();

        

    return (
        <div className='w-full'  >

            {label && <label htmlFor={id}
            className=''>
                {label}
            </label>
            }

            <select
            id = {id}
            ref={ref}
            {...props}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            >                    
                {options?.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
                ))}           

            </select>

        </div>
    )
}

export default forwardRef(Select)