"use client"
import React, { useState } from 'react'
import LikeButton from './LikeButton'
import CommentButton from './CommentButton'
import ShareButton from './ShareButton'
import CommentForm from './CommentForm'
import CommentList from './CommentList'

const PostCard = ({post}) => {
  const [isCommentOpen, setIsCommentOpen] = useState(false)
  const [comments, setComments] = useState([])

  const fetchComments = async (postId) => {
    try {
      const res = await fetch(`/api/comment?postId=${postId}`, {
        method: 'GET',
      });
      if (!res.ok) {
        throw new Error("Failed to fetch comments");
      }
      const comments = await res.json();
      setComments(comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const toggleComments = () => { //onClick={() => setIsCommentOpen(!isCommentOpen)}
    setIsCommentOpen((prev) => !prev);
    if (!isCommentOpen) {
      fetchComments(post._id); // Fetch comments only when opening the section
    }
  };

  const handleCommentSubmit = (newComment) => {
    e.preventDefault()
    setComments((prevComments) => [newComment, ...prevComments])
  }
 
  return (
    <>
  <div className="p-4 bg-white rounded shadow-md space-y-4 max-w-xl mx-auto">
      {/* Header: Author info and timestamp */}
      <div className="flex items-center space-x-4">
        <img
          // src="https://picsum.photos/100/100"
          src={post.author.image}
          alt="Author's avatar"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h2 className="font-semibold">{post.author.username}</h2>
          <p className="text-sm text-gray-500">November 8, 2023 at 3:30 PM</p>
        </div>
      </div>

      {/* Content: Post text */}
      <p className="text-gray-800">
       {post.content} <span className="text-blue-500">#webdevelopment</span>{" "}
        <span className="text-blue-500">#javascript</span>
      </p>

      {/* Image */}
      <div className="overflow-hidden rounded-lg max-w-full">
        <img
           src={post.image}
          alt="Post content"
          className="w-full h-auto max-w-full object-cover"
        />
      </div>

      {/* Footer: Interaction counts */}
      <div className="flex justify-between items-center text-gray-500 text-sm">
          <LikeButton initialCount={42} />
          <div className="flex space-x-4">
            <CommentButton onClick={toggleComments} count={7}/>
            <ShareButton initialCount={3} />
          </div>
        </div>

        {isCommentOpen && (
        <div className="mt-4">
          <CommentForm post={post} onCommentAdded={handleCommentSubmit} />
          <CommentList  comments={comments} />
        </div>
      )}
     
    </div>
  
  </>
  )
}

export default PostCard  















  //   <div className="p-4 bg-white rounded shadow-md space-y-4 max-w-xl mx-auto">
  //   {/* Header: Author info and timestamp */}
  //   <div className="flex items-center space-x-4">
  //     <img
  //       src="/placeholder.svg?height=40&width=40"
  //       alt="Author's avatar"
  //       className="w-10 h-10 rounded-full"
  //     />
  //     <div>
  //       <h2 className="font-semibold">John Doe</h2>
  //       <p className="text-sm text-gray-500">November 8, 2023 at 3:30 PM</p>
  //     </div>
  //   </div>

  //   {/* Content: Post text */}
  //   <p className="text-gray-800">
  //     Just finished a great coding session! <span className="text-blue-500">#webdevelopment</span>{" "}
  //     <span className="text-blue-500">#javascript</span>
  //   </p>

  //   {/* Image */}
  //   <div className="overflow-hidden rounded-lg max-w-full">
  //     <img
  //       // src="/placeholder.svg?height=400&width=600"
  //       src="/trainings/boxing.jpg"
  //       alt="Post content"
  //       className="w-full h-auto max-w-full object-cover"
  //     />
  //   </div>

  //   {/* Footer: Interaction counts */}
  //   <div className="flex justify-between items-center text-gray-500 text-sm">
  //     <div className="flex items-center space-x-2">
  //       <span className="font-semibold">{42}</span> <span>Likes</span>
  //     </div>
  //     <div className="flex space-x-4">
  //       <span>{7} Comments</span>
  //       <span>{3} Shares</span>
  //     </div>
  //   </div>
  // </div>