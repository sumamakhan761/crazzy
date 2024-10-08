import ProfileForm from '@/components/forms/profile-form'
import React from 'react'

type Props = {}
const Settings = (props: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="sticky top-0 z-[10] flex items-center justify-between border-b bg-background/50 p-6 text-3xl backdrop-blur-lg">
        <span>Settings</span>
      </h1>
      <div className="flex flex-col g-10 p-6">
        <div>
          <h2 className='text-2xl font-bold'>User Profile</h2>
          <p className="text-md text-white/50">Add or Update You information</p>
        </div>
        <ProfileForm />
      </div>
    </div>
  )
}

export default Settings 
