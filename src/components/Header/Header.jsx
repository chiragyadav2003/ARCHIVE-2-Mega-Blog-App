import React from 'react'
import {Container,LogoutBtn, Logo} from "../index"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

//* Header is a little optional, we will not display everything at once, like
// * we will display logout button to user only when he has logged in


function Header() {

  const authStatus = useSelector((state)=>state.auth.status)

  const navigate = useNavigate()

  const navItems = [
      {
        name: 'Home',
        slug: "/",
        active: true
      }, 
      {
        name: "Login",
        slug: "/login",
        active: !authStatus,
      },
      {
        name: "Signup",
        slug: "/signup",
        active: !authStatus,
      },
      {
        name: "All Posts",
        slug: "/all-posts",
        active: authStatus,
      },
      {
        name: "Add Post",
        slug: "/add-post",
        active: authStatus,
      }
  ]

  // there is a difference between link and useNavigate, for link
  // to go on any url it needs to be clicked while useNavigate can go
  // on any url without clicking, we can use it in any function

  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>

          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px'   />
            </Link>
          </div>

          <ul className='flex ml-auto'>
            {/* TODO: we will display only those in navItems array which has active property true */}
           
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                >{item.name}</button>
              </li>
            ) : null
            )}

            {/* if user is logged in then only we will display logout btn */}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}

          </ul>

        </nav>
        </Container>
    </header>
  )
}

export default Header