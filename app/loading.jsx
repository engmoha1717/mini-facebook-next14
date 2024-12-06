import React from 'react'

const Loading = ({ text = 'Loading...', size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-4 h-4 border-2',
    medium: 'w-8 h-8 border-4',
    large: 'w-12 h-12 border-4'
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div 
        className={`${sizeClasses[size]} border-t-blue-500 border-r-blue-500 border-b-blue-200 border-l-blue-200 rounded-full animate-spin`}
        role="status"
        aria-label="loading"
      ></div>
      {text && <p className="mt-2 text-gray-600">{text}</p>}
    </div>
  )
}

export default Loading