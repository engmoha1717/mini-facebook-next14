
import ProfileList from '@/components/ProfileList'
// import { useSession } from 'next-auth/react'
import {  useSession } from 'next-auth/react';
import React from 'react'

const ProfilePage = async() => {


  
  return (
    <div>
      <ProfileList/>
    </div>
  )
}

export default ProfilePage