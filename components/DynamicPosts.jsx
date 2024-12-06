'use client'

import { useState } from 'react'
import PostCard from '@/components/PostCard'
import PostForm from '@/components/PostForm'
import {PlusCircle } from 'lucide-react';

const DynamicPosts = ({ initialPosts }) => {
  const [posts, setPosts] = useState(initialPosts)
  const [isFormVisible, setIsFormVisible] = useState(false)

  const handlePostCreated = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts])
    setIsFormVisible(false) // Hide the form after posting
  }

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible)
  }

  return (
    <div className="space-y-4">
      <button 
        onClick={toggleFormVisibility}
        className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white"
      >
        <PlusCircle size={20} />
        {isFormVisible ? 'Cancel' : 'Create a Post'}
      </button>
      
      {isFormVisible && (
        <div className="bg-white p-4 rounded-lg shadow transition-all duration-300 ease-in-out">
          <PostForm onPostCreated={handlePostCreated} />
        </div>
      )}
      
      <div className="space-y-4 mt-4">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default DynamicPosts













// 'use client'

// import { useState } from 'react'
// import PostCard from '@/components/PostCard'
// import PostForm from '@/components/PostForm'


// const DynamicPosts = ({ initialPosts }) => {
//   const [posts, setPosts] = useState(initialPosts)

//   const handlePostCreated = (newPost) => {
//     setPosts((prevPosts) => [newPost, ...prevPosts])
//   }

//   return (
//     <div>
//       <PostForm onPostCreated={handlePostCreated} />
//       <div className="space-y-4 mt-4">
//         {posts.map((post) => (
//           <PostCard key={post._id} post={post} />
//         ))}
//       </div>
//     </div>
//   )
// }

// export default DynamicPosts