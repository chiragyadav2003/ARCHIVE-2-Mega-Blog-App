import React, {useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// ** using authLayout we will display only those cmponents whose authentication is true
// ** it is for security purpose
// ** if authentication is false then we will redirect to login page
// ** if authentication is true then we will display the component

function AuthLayout({children, authentication = true}) {

    const navigate = useNavigate()

    const[loader,setLoader] = useState(true)

    const authStatus = useSelector((state)=>state.auth.status)

    useEffect(()=>{ 
        if (authentication && authStatus !== authentication) {
            navigate('/login')
        } else if(!authentication && authStatus !== authentication){
            navigate('/')
        }        
        setLoader(false)
    }, [authStatus,navigate,authentication])


  return 
    loader ? <h1>Loading...</h1> : <>{children}</>
  
}

export default AuthLayout