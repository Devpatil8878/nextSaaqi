"use client"

import React, { useEffect, useMemo, useState } from 'react';
import gsap from 'gsap'
import { useGSAP } from '@gsap/react';

import { GoogleAuthProvider,GithubAuthProvider, getAuth, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { useFirebase } from '@/context/Firebase';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database'
import Navbar from '@/components/sub_components/Navbar';
import { setTEMPUSER, setUSERFULLINFO } from '@/store/actions';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import UserCard from '@/components/sub_components/FollowButton';
import UserListCard from '@/components/sub_components/UserListCard';
import mongoose from 'mongoose';


const firebaseConfig = {
  apiKey: "AIzaSyAwFJqTHIokgnBZw-F9fdihAOV0AutSJMU",
  authDomain: "saaqi-194de.firebaseapp.com",
  projectId: "saaqi-194de",
  storageBucket: "saaqi-194de.appspot.com",
  messagingSenderId: "178575618437",
  appId: "1:178575618437:web:3a0b80ddb4da44ac04d4ec",
  measurementId: "G-L17RZF5ZKF",
  databaseURL: "https://saaqi-194de-default-rtdb.firebaseio.com/"
};


const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

interface currentUser{
  _id: mongoose.ObjectId,
  fullname: string,
  username: string,
  email: string,
  password: string,
  confirmpassword: string,
  profilePicture: string,
  bio: string,
  likes: [string],
  posts: [string],
  stories: [string],
  followers: [string],
  followings: [string],

}

function Account() {

  const [userData, setUserData] = useState<currentUser>();
  const [loading, setLoading] = useState(true);
  let [googleLogged, setGoogleLogged] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<currentUser>();

  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (user) => {
      if(user){
        const res = await axios.get(`api/findUserByEmail?email=${user.email}`)
        setCurrentUser(res.data.user);
        dispatch(setUSERFULLINFO(res.data.user));
        setUserData(res.data.user); 
        console.log(currentUser)

        setGoogleLogged(true)
      }
      
    })
  }, [])



  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user/');
        if (response.ok) {
          const data = await response.json();
          setCurrentUser(data.user);
          setUserData(data.user); 
        } else {
          console.error('Failed to fetch user data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const [userFollowers, setUserFollowers] = useState(0)
  // const [followersList, setFollowersList] = useState([]);

  useMemo(() => {
    const countFollowers = async () => {
      try{
        const res = await axios.get(`/api/countfollowers?userId=${currentUser?._id}`);
        setUserFollowers(res.data.followerCount)
        // setFollowersList(res.data.followerslist)
        console.log("LIST:  ",res.data.followerslist)
      }
      catch{
        console.log("error")
      }
    }
  
    countFollowers()

  }, [])


  const [userFollowings, setUserFollowings] = useState(0)

  useEffect(() => {
    const countFollowings = async () => {
      try{
        const res = await axios.get(`/api/countfollowings?userId=${currentUser?._id}`);
        setUserFollowings(res.data.followingCount)
      }
      catch{
        console.log("error")
      }
    }
    countFollowings()
  }, [])

  const [userPosts, setUserPosts] = useState(0)

  useEffect(() => {
    const countPosts = async () => {
      try{
        const res = await axios.get(`/api/countuserposts?userId=${currentUser?._id}`);
        console.log(currentUser)
        setUserPosts(res.data.postsCount)
      }
      catch{
        console.log("error")
      }
    }
    countPosts()
  }, [])
  

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  useGSAP(() => {
    var tl = gsap.timeline();
    tl.from(".gsap", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
    });
  });


  return (
    <>
      <Navbar />
      <div className="main flex gap-32 dark-mode-bg w-full h-[100vh] p-32 pl-[30rem]">

        <div className="profile gsap w-[10rem] h-[10rem] overflow-hidden rounded-full relative cursor-pointer">
          <img src={currentUser?.profilePicture || "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"} className='object-cover  object-center' />
          <input type="file" name="profile" id="" onChange={handleFileChange} className='absolute w-full h-full z-[5] '/>
        </div>

        <div className="information mt-5 gsap w-[20rem] h-[8rem] justify-start">
          <div className='flex gap-8'>
            <h1 className="text-2xl">{googleLogged ? currentUser?.fullname : userData?.fullname}</h1>
            <button>Edit Profile</button>
          </div>

          <div className='flex gap-7'>
            <h1>{userPosts}</h1> <span className='ml-[-7%] gsap'>posts</span>
            <h1>{userFollowers }</h1> <span className='ml-[-7%] gsap'>followers</span>
            <h1>{userFollowings }</h1> <span className='ml-[-7%] gsap'>followings</span>
          </div>

          <h1 className='mt-4 font-semibold gsap'>{currentUser?.fullname }</h1>
          <h1 className='font-thin gsap'>{currentUser?.bio }</h1>
        </div>

        <div>
{/* 
          {
            followersList.map((elem, index) => (
              <UserListCard userData={elem} key={index} isDarkMode={true}/>
            ))
          } */}

        </div>
      </div>
    </>
  );
}

export default Account;
