"use client";
import React, {useState, useEffect} from 'react';
import {useAppSelector} from '@/app/redux/hooks';
import {IoCamera} from 'react-icons/io5';
import instance from '@/utils/axios';
import {notifyError, notifySuccess} from '@/utils/toast';
import axios from 'axios';
import UserHearder from '@/components/UserHearder';

const ProfilePage = () => {
  const admin = useAppSelector( ( state: any ) => state?.superAdmin?.admin );
  const [isLoading, setIsLoading] = useState( false );
  const [profileImage, setProfileImage] = useState<File | null>( null );
  const [formData, setFormData] = useState( {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    bio: '',
  } );

  useEffect( () => {
    if ( admin ) {
      setFormData( {
        firstName: admin.name.split( ' ' )[0] || '',
        lastName: admin.name.split( ' ' ).slice( 1 ) || '',
        email: admin.email || '',
        password: '',
        bio: admin.bio || '',
      } );
    }
  }, [admin] );

  console.log( "formdata:-", formData, "admin:-", admin );

  const handleInputChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
    const {name, value} = e.target;
    setFormData( prevData => ( {
      ...prevData,
      [name]: value,
    } ) );
  };

  const handleImageChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    if ( e.target.files && e.target.files[0] ) {
      setProfileImage( e.target.files[0] );
    }
  };

  const getUploadUrl = async ( fileName: string ): Promise<string> => {
    try {
      const response = await instance.post<{url: string;}>( "/aws/getUploadRrl", {
        folder: 'admin',
        fileName,
      } );
      return response.data.url;
    } catch ( error ) {
      console.error( 'Error getting upload URL:', error );
      throw error;
    }
  };

  const uploadToAWS = async ( file: File ): Promise<string> => {
    try {
      const uploadUrl = await getUploadUrl( file.name );
      await axios.put( uploadUrl, file, {
        headers: {'Content-Type': file.type},
      } );
      return `https://${process.env.NEXT_PUBLIC_AWS_BUCKET}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/admin/${file.name}`;
    } catch ( error ) {
      console.error( 'Error uploading file to AWS:', error );
      throw error;
    }
  };

  const handleSubmit = async ( e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault();
    setIsLoading( true );

    try {
      let imageUrl = admin.profileImage;

      if ( profileImage ) {
        imageUrl = await uploadToAWS( profileImage );
      }

      const updatedData = {
        ...formData,
        profileImage: imageUrl,
      };

      const response = await instance.put( `auth/admin/${admin._id}`, updatedData );
      notifySuccess( 'Profile updated successfully!' );
      console.log( 'Profile updated:', response.data );
      // Update the user state in Redux here if necessary
    } catch ( error: any ) {
      notifyError( `${error?.response?.data?.message || 'An error occurred while updating the profile'}` );
      console.error( 'Error updating profile:', error );
    } finally {
      setIsLoading( false );
    }
  };

  return (
   
    <div className="ml-64 bg-[#0A090F] text-white m-4 rounded-2xl w-full border border-[#28272D] ">
        <div className="border-b border-[#28272D] px-4 py-4">
          <h2 className="text-xl px-6">Update Profile</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          <div className="flex items-center justify-start mb-6 border border-[#28272D] rounded-lg px-4 py-3 bg-[#1B1923]">
            <div className="relative">
              <img
                src={admin?.profileImage || "/asset/Vector3.svg"}
                alt="Profile Photo"
                className="w-32 h-32 cursor-pointer rounded-full object-cover bg-gray-700"
              />
              <label htmlFor="profile-image-upload" className="absolute border bottom-0 right-0 bg-orange-500 p-2 rounded-full cursor-pointer">
                <IoCamera className="h-5 w-5" />
              </label>
              <input
                id="profile-image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-[#7B7A7F] mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Enter your first name"
                className="w-full px-3 py-2 bg-[#0A090F] border border-[#28272D] text-white rounded-md outline-none custom-input"
              />
            </div>
            <div>
              <label className="block text-[#7B7A7F] mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Enter your last name"
                className="w-full px-3 py-2 bg-[#0A090F] border border-[#28272D] text-white rounded-md outline-none custom-input"
              />
            </div>
            <div className="mt-4">
              <label className="block text-[#7B7A7F] mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full px-3 py-2 bg-[#0A090F] border border-[#28272D] text-white rounded-md outline-none custom-input"
              />
            </div>
            <div className="mt-4">
              <label className="block text-[#7B7A7F] mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter new password (optional)"
                className="w-full px-3 py-2 bg-[#0A090F] border border-[#28272D] text-white rounded-md outline-none custom-input"
              />
            </div>
            <div className="mt-4 col-span-2">
              <label className="block text-[#7B7A7F] mb-1">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Enter your bio..."
                className="w-full px-3 py-2 bg-[#0A090F] border border-[#28272D] text-white rounded-md outline-none custom-input"
                rows={4}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-600 text-white rounded-md"
              onClick={() => window.history.back()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Update Profile'}
            </button>
          </div>
        </form>
      </div>
  );
};

export default ProfilePage;