import React from 'react'
import service from "../appwrite/config"
import { Link } from 'react-router-dom'

// ** in appwrite 'id' is passed as - $id
// for postcard we need only 3 info - image(featuredImage), title and id
// complete card needs to be clickable and should redirect to the post page
//in link we are not required to pass whole link, using link we will go from current url to the next url
//**here post id = $id and image id is featuredImage
function PostCard({$id,title,featuredImage}) {


  return (

    // $id => id  and ${$id} => injecting variable into string for url
    //using $id - we can find post
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>

            <div className='w-full justify-center mb-4'>
                //getting preview of image to be displayed in card
                <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
                className='rounded-xl' />
            </div>

            <h2
            className='text-xl font-bold'
            >{title}</h2>
            
        </div>
    </Link>

  )
}

export default PostCard