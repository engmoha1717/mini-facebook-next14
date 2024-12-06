"use client"
import React, { useState } from 'react'

const CommentForm = ({post,onCommentAdded}) => {
  const [comment, setComment] = useState('')

  const handleCommentSubmit =async(e)=>{
    e.preventDefault()
    if (!comment.trim()) return
    const data = {
      content:comment,
      recipient:post.author,
      post:post._id
    }
    try {
      const res= await fetch('/api/comment',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
      })
      const newComment = await res.json()
      onCommentAdded(newComment)
      setComment('')
    } catch (error) {
      console.log(error)
    }
    console.log(data)
  }
  return (
    <form onSubmit={handleCommentSubmit} className="mt-4">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              onClick={() => {
                // fetchComments(post._id);
                setIsCommentOpen(!isCommentOpen);
              }} >
              Post Comment
            </button>
          </form>
  )
}

export default CommentForm