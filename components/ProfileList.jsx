"use client"
import React from 'react'
import {  useSession } from 'next-auth/react';

const ProfileList = () => {

    const { data: session } = useSession();
    const profileImage = session?.user?.image;
     const profileName = session?.user?.name;
     const profileEmail = session?.user?.email;

  return ( 
  <div className='flex justify-center  min-h-screen bg-blue-100'>
    <div className='md:flex justify-center m-6  sm:items-center gap-3  w-full max-w-5xl'>
        <aside className='w-3/12 p-4'>
            <img
            className='rounded-full'
            src={profileImage}
            alt="profile" />
            <h1>{profileName}</h1>
            
            <p>{profileEmail}</p>
        </aside>
        <section className='w-9/12'>
            <p>content</p>
            <img src="https://picsum.photos/200/200" alt="" />
        </section>
        </div>
    </div>
  )
}

export default ProfileList

{/* <div class="flex justify-center items-center min-h-screen bg-gray-100">
  <div class="flex w-full max-w-5xl">
    <!-- Left Section (30%) -->
    <div class="w-3/12 bg-blue-300 p-4">
      <p class="text-center">Left Side Content (30%)</p>
    </div>

    <!-- Right Section (70%) -->
    <div class="w-9/12 bg-yellow-300 p-4">
      <p class="text-center">Right Side Content (70%)</p>
    </div>
  </div>
</div> */}
