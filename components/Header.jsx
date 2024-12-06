import React from 'react'
import Navbar from './Navbar'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/authOptions'

const Header =async () => {
const session =await getServerSession(authOptions)

return <Navbar sessionData={session} />
}

export default Header