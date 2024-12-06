'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Home, FileText, PenTool, LogIn, LogOut, Menu, X, User } from 'lucide-react'
import { signIn, signOut, useSession, getProviders } from "next-auth/react"

export default function Navbar({ sessionData }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [providers, setProviders] = useState(null)
  const pathname = usePathname()
  const router = useRouter()
  const { data: clientSession, status } = useSession()


  useEffect(() => {
    const setUpProviders = async () => {
      const res = await getProviders()
      setProviders(res)
    }
    setUpProviders()
  }, [])

  const getLinkClass = (href) => {
    return `${
      pathname === href
        ? 'bg-indigo-700 text-white'
        : 'text-gray-300 hover:bg-indigo-700 hover:text-white'
    } px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ease-in-out flex items-center`
  }

  const handleLogout = async () => {
    const data = await signOut({ redirect: true, callbackUrl: '/' })
    router.push(data.url)
  }

  const session = sessionData || clientSession
  const isAuthenticated = status === 'authenticated' || !!session

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-white text-2xl font-bold">DevHub</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className={getLinkClass('/')}>
                <Home className="w-5 h-5 mr-1" />
                Home
              </Link>
              <Link href="/posts" className={getLinkClass('/posts')}>
                <FileText className="w-5 h-5 mr-1" />
                Posts
              </Link>
              {isAuthenticated && (
                <Link href="/create" className={getLinkClass('/create')}>
                  <PenTool className="w-5 h-5 mr-1" />
                  Create
                </Link>
              )}
              {!isAuthenticated ? (
                <div className="flex space-x-2">
                  {providers &&
                    Object.values(providers).map((provider) => (
                      <button
                        key={provider.name}
                        onClick={() => signIn(provider.id)}
                        className="text-gray-300 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ease-in-out flex items-center"
                      >
                        <LogIn className="w-5 h-5 mr-1" />
                        {`Login with ${provider.name}`}
                      </button>
                    ))}
                </div>
              ) : (
                <>
                  <Link href="/profile" className={getLinkClass('/profile')}>
                    <User className="w-5 h-5 mr-1" />
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-gray-300 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ease-in-out flex items-center"
                  >
                    <LogOut className="w-5 h-5 mr-1" />
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-800 focus:ring-white"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 transition-all duration-300 ease-in-out transform origin-top opacity-100 scale-y-100">
            <Link
              href="/"
              className={`${getLinkClass('/')} block`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Home className="w-5 h-5 mr-2" />
              Home
            </Link>
            <Link
              href="/posts"
              className={`${getLinkClass('/posts')} block`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FileText className="w-5 h-5 mr-2" />
              Posts
            </Link>
            {isAuthenticated && (
              <Link
                href="/create"
                className={`${getLinkClass('/create')} block`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <PenTool className="w-5 h-5 mr-2" />
                Create
              </Link>
            )}
            {!isAuthenticated ? (
              <div className="space-y-1">
                {providers &&
                  Object.values(providers).map((provider) => (
                    <button
                      key={provider.name}
                      onClick={() => {
                        signIn(provider.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-gray-300 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ease-in-out flex items-center w-full"
                    >
                      <LogIn className="w-5 h-5 mr-2" />
                      {`Login with ${provider.name}`}
                    </button>
                  ))}
              </div>
            ) : (
              <>
                <Link
                  href="/profile"
                  className={`${getLinkClass('/profile')} block`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="w-5 h-5 mr-2" />
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-gray-300 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ease-in-out flex items-center w-full"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
















// 'use client'

// import { useState } from 'react'
// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import { Home, FileText, PenTool, LogIn, LogOut, Menu, X } from 'lucide-react'

// export default function Navbar() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
//   const pathname = usePathname()

//   const navItems = [
//     { name: 'Home', href: '/', icon: Home },
//     { name: 'Posts', href: '/posts', icon: FileText },
//     { name: 'Create', href: '/create', icon: PenTool },
//     { name: 'Login', href: '/login', icon: LogIn },
//     { name: 'Logout', href: '/logout', icon: LogOut },
//   ]

//   return (
//     <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           <div className="flex items-center">
//             <Link href="/" className="flex-shrink-0">
//               <span className="text-white text-2xl font-bold">DevHub</span>
//             </Link>
//           </div>
//           <div className="hidden md:block">
//             <div className="ml-10 flex items-baseline space-x-4">
//               {navItems.map((item) => (
//                 <Link
//                   key={item.name}
//                   href={item.href}
//                   className={`${
//                     pathname === item.href
//                       ? 'bg-indigo-700 text-white'
//                       : 'text-gray-300 hover:bg-indigo-700 hover:text-white'
//                   } px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ease-in-out flex items-center`}
//                 >
//                   <item.icon className="w-5 h-5 mr-1" />
//                   {item.name}
//                 </Link>
//               ))}
//             </div>
//           </div>
//           <div className="md:hidden">
//             <button
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-800 focus:ring-white"
//             >
//               <span className="sr-only">Open main menu</span>
//               {isMobileMenuOpen ? (
//                 <X className="block h-6 w-6" aria-hidden="true" />
//               ) : (
//                 <Menu className="block h-6 w-6" aria-hidden="true" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {isMobileMenuOpen && (
//         <div className="md:hidden">
//           <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//             {navItems.map((item) => (
//               <Link
//                 key={item.name}
//                 href={item.href}
//                 className={`${
//                   pathname === item.href
//                     ? 'bg-indigo-700 text-white'
//                     : 'text-gray-300 hover:bg-indigo-700 hover:text-white'
//                 } block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ease-in-out flex items-center`}
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 <item.icon className="w-5 h-5 mr-2" />
//                 {item.name}
//               </Link>
//             ))}
//           </div>
//         </div>
//       )}
//     </nav>
//   )
// }