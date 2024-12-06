"use client"
import { Share } from 'lucide-react'
import { useState } from 'react'

const ShareButton = ({initialCount}) => {
    const [count, setCount] = useState(initialCount)
    const handleShare = () => {
        setCount(count + 1)
    }
  return (
    <button  onClick={handleShare}
    className="flex items-center space-x-1 text-gray-500 hover:text-purple-500 transition-colors"
     >
      <span><Share size={18} /></span>
      <span className="font-semibold">{count}</span>
      <span>Shares</span>
    </button>
  )
}

export default ShareButton