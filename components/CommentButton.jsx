"use client"
import { MessageCircle } from 'lucide-react'
import React from 'react'

const CommentButton = ({ count, onClick }) => {
  return (
    <button 
    onClick={onClick}
    className="flex items-center space-x-1 text-gray-500 hover:text-green-500 transition-colors"
  >
    <MessageCircle size={18} />
    <span className="font-semibold">{count}</span>
    <span>Comments</span>
  </button>
  )
}

export default CommentButton