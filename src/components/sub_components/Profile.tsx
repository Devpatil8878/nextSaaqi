"use client"

import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';

const Profile: React.FC = () => {

  const FULLUSER = useSelector((state: any) => state.rootReducer.fullUserInfo)

  return (
    <>
      <Link href="/account">

          <div className="profile">
            <button className='w-12 h-12 flex justify-center items-center rounded-full m-5 ml-8 mr-3 min-w-12'>
              <img className='object-cover w-full h-full rounded-full ' src={FULLUSER.profilePicture} />    
            </button>
          </div>

      </Link>
    </>
  );
};

export default Profile;
