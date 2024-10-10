import ProfileForm from '@/components/forms/profile-form';
import React from 'react';
import ProfilePicture from './_components/profile-picture';
import { db } from '@/lib/db';
import { currentUser } from '@clerk/nextjs/server';

type User = {
  id: number; // Ensure id is a number if that's the type in your database
  clerkId: string;
  name: string | null; // Allow name to be null
  email: string;
  profileImage?: string | null;
};

const Settings = async () => {
  const authUser = await currentUser();
  if (!authUser) return null;

  const user: User | null = await db.user.findUnique({
    where: { clerkId: authUser.id },
  });

  const removeProfileImage = async () => {
    'use server';
    try {
      await db.user.update({
        where: { clerkId: authUser.id },
        data: { profileImage: '' },
      });
    } catch (error) {
      console.error('Failed to remove profile image:', error);
      throw new Error('Unable to remove profile image. Please try again.');
    }
  };

  const uploadProfileImage = async (image: string) => {
    'use server';
    try {
      await db.user.update({
        where: { clerkId: authUser.id },
        data: { profileImage: image },
      });
    } catch (error) {
      console.error('Failed to upload profile image:', error);
      throw new Error('Unable to upload profile image. Please try again.');
    }
  };

  const updateUserInfo = async (name: string): Promise<void> => { // Ensure this returns void
    'use server';
    try {
      await db.user.update({
        where: { clerkId: authUser.id },
        data: { name },
      });
    } catch (error) {
      console.error('Failed to update user info:', error);
      throw new Error('Unable to update user information. Please try again.');
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="sticky top-0 z-[10] flex items-center justify-between border-b bg-background/50 p-6 text-4xl backdrop-blur-lg">
        <span>Settings</span>
      </h1>
      <div className="flex flex-col gap-10 p-6">
        <div>
          <h2 className="text-2xl font-bold">User Profile</h2>
          <p className="text-base text-white/50">Add or update your information</p>
        </div>
        <ProfilePicture
          onDelete={removeProfileImage}
          userImage={user?.profileImage || ''}
          onUpload={uploadProfileImage}
        />
        <ProfileForm user={user} onUpdate={updateUserInfo} />
      </div>
    </div>
  );
};

export default Settings;
