"use client"

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import UserCard from './FollowButton';

interface UserData {
  _id: string
  fullname: string;
  username?: string;
  email?: string;
  password?: string;
  confirmpassword?: string;
  profilePicture: string;
  bio: string;
  likes: {
      post: string;
      createdAt: Date;
  }[];
  posts: {
      post: string;
      createdAt: Date;
  }[];
  stories: {
      story: string;
      createdAt: Date;
  }[];
  followers: {
      user: string;
      createdAt: Date;
  }[];
  followings: {
      user: string;
      createdAt: Date;
  }[];
  createdAt: Date;
}


interface UserAccountProps {
  isDarkMode: boolean;
}

const UserAccount: React.FC<UserAccountProps> = ({ isDarkMode }) => {

  const [userData, setUserData] = useState<UserData[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {

    // const currentUser = USER.email

    const fetchUsers = async () => {
      try {
        const response = await axios.get(`/api/userslist`)
        if (response.status !== 200) {
          throw new Error('Failed to fetch feed');
        }
        const data = await response.data;
        const updatedData = data.map((user: any) => ({ ...user, isFollowing: false }));
        setUserData(updatedData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);


  useGSAP(() => {
    gsap.from(".friends-animation", {
      y: 100,
      opacity: 0,
      stagger: 0.3,
      delay: 1
    });
  });

  // const [userToFollow, setUserToFollow] = useState({});
  const userinfo = useSelector((state: any) => state.rootReducer.user);
  const FULLUSER = useSelector((state: any) => state.rootReducer.fullUserInfo)

  let currentuserinfo = {};
  let newuserinfo = "";

  let containsNumber123;


  const handleFollowClick = async (val: any, i: any) => {
    try {
      setLoading(true);
      
      const newUserinfo = await axios.get(`api/findUserByEmail?email=${userinfo.email}`)
      const newVal = await axios.get(`api/findUserByEmail?email=${val.email}`)

      const followUserId = userData[i]._id;

      const resFollow = await axios.put('/api/followUser', {
        currentUserId: newUserinfo.data.user._id,
        followingId: newVal.data.user._id,
      });

      const resUnfollow = await axios.delete('/api/followUser', {
        data: {
          currentUserId: newUserinfo.data.user._id,
          followingId: newVal.data.user._id,
        }
      });

      currentuserinfo = newUserinfo.data.user;
      newuserinfo = newVal.data.user._id;
      console.log("USER KI INFO: ", currentuserinfo)

      if(resFollow.status === 200){
        setUserData(prevData => {
          const updatedData = [...prevData];
          return updatedData;
        });
        setLoading(false);
      }

      if(resUnfollow.status === 201){
        setUserData(prevData => {
          const updatedData = [...prevData];
          return updatedData;
        });
        setLoading(false);
      }
    } catch (error) {
      console.error('Error following user:', error);
      setLoading(false);
    }
  };


  return (
    <>
      {userData.map((elem, index) => (
        <UserCard userData={elem} key={index} isDarkMode={isDarkMode}/>
 
      ))}
    </>
  );
};

export default UserAccount;
