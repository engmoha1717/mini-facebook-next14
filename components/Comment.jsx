import React from 'react'

const Comment = ({comment}) => {
    
  return (
    <div key={comment._id} className="p-2 border-b border-gray-200">
    <div className="flex items-center space-x-2">
      <img
        src={comment.sender.image}
        alt={`${comment.sender.username}'s avatar`}
        className="w-8 h-8 rounded-full"
      />
      <h4 className="font-semibold">{comment.sender.username}</h4>
    </div>
    <p className="text-gray-800 ml-10">{comment.content}</p>
  </div>
  )
}

export default Comment