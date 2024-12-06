"use client"
import { ThumbsUp } from 'lucide-react'
import React, { useState } from 'react'

const LikeButton = ({ initialCount }) => {
  const [count, setCount] = useState(initialCount)
  const [isLiked, setIsLiked] = useState(false)

  const handleLike =()=>{}
  return (
    <button 
    onClick={handleLike}
    className={`flex items-center space-x-1 transition-colors ${
      isLiked ? 'text-blue-500' : 'text-gray-500 hover:text-blue-500'
    }`}
  >
    <ThumbsUp size={18} className={isLiked ? 'fill-current' : ''} />
    <span className="font-semibold">{count}</span>
    <span>{isLiked ? 'Liked' : 'Like'}</span>
  </button>
  )
}

export default LikeButton