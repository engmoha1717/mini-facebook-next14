import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <div className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
        <div className="flex flex-col items-center space-y-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Welcome to DevHub
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl max-w-2xl text-purple-100">
            Collaborate, Create, and Connect with Developers Worldwide
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-4">
            <Link
              href="/posts"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 transition duration-150 ease-in-out"
            >
              Explore Posts
              <ArrowRight className="ml-2 -mr-1 w-5 h-5" aria-hidden="true" />
            </Link>
            <Link
              href="/create"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition duration-150 ease-in-out"
            >
              Create Post
              <ArrowRight className="ml-2 -mr-1 w-5 h-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
      <div className="h-16 bg-gradient-to-b from-indigo-800 to-white opacity-20"></div>
    </div>
  )
}