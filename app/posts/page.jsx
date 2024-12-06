import DynamicPosts from '@/components/DynamicPosts'
import LeftSideBar from '@/components/LeftSideBar'
// import Posts from '@/components/Posts'
import RightSideBar from '@/components/RightSideBar'
import { fetchPosts } from '@/utils/request'
import React from 'react'
// import posts from '../../data.json'
export const revalidate = 0;
const PostPage = async () => {
  const initialPosts = await fetchPosts()
    
  return (
    <div className="flex justify-center bg-gray-100 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-6xl gap-4">
        {/* Left Sidebar */}
        <div className="w-full md:w-1/4 p-4 bg-white rounded shadow-md">
          <h2 className="text-lg font-semibold">Left Sidebar</h2>
          <LeftSideBar/>
        </div>

        {/* Center Column */}
        <div className="w-full md:w-1/2 p-4 bg-white rounded shadow-md">
          <h2 className="text-lg font-semibold">Main Content</h2>
          <div className="space-y-4">
          <DynamicPosts initialPosts={initialPosts} />
{/*            
            {posts.map((post) => (
              <DynamicPosts initialPosts={initialPosts} />
            ))} */}
          
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full md:w-1/4 p-4 bg-white rounded shadow-md">
          <h2 className="text-lg font-semibold">Right Sidebar</h2>
          <RightSideBar/> 
        </div>
      </div>
    </div>
  )
}

export default PostPage