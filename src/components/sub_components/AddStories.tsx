//app/addimages.jsx

"use client"

import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import User from '../../../models/User'; 
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useGSAP } from '@gsap/react';
import { GoogleAuthProvider,GithubAuthProvider, getAuth, onAuthStateChanged, } from "firebase/auth";
import gsap from 'gsap'
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database'
import { setTEMPUSER, setUSERFULLINFO } from '@/store/actions';
import axios from 'axios';
import Link from 'next/link';
import Storypopup from './Storypopup';


function AddStories(): JSX.Element {

  const [file, setFile] = useState(null);


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

  
  const TEMPUSER = useSelector((state: any) => state.rootReducer.tempUser)
  const dispatch = useDispatch()
  const FULLUSERINFO = useSelector((state: any) => state.rootReducer.fullUserInfo)
  const [userId, setUserId] = useState();


  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (user) => {
      if(user){
        dispatch(setTEMPUSER(user))
        const userinfo = await axios.get(`/api/findUserByEmail?email=${user.email}`)
        setUserId(userinfo.data.user._id);
          
          dispatch(setUSERFULLINFO({
            fullname: userinfo.data.user.fullname,
            email: userinfo.data.user.email,
            username: userinfo.data.user.username,
            bio: userinfo.data.user.bio,
            profilePicture: userinfo.data.user.profilePicture
          })) 
      }
      else{
        
      }
    })
  }, [])

 

  let name = TEMPUSER.fullname
  let email = TEMPUSER.email


  const [formData, setFormData] = useState({
    id: userId,
    story: ""
  });

  const [filepath, setFilepath] = useState("");

  const handleFileChange = async (event : any) => {
    console.log("IMAGEUSER: ",FULLUSERINFO)
    const userString = JSON.stringify(FULLUSERINFO);

    const file = event.target.files?.[0];
    setFile(file)
    if (file) {
      
      try {
        const formdata = new FormData();
        formdata.append('file', file);
        formdata.append('user', userString);


        const response = await fetch('/api/uploadimage', {
          method: 'POST',
          body: formdata,
        });
        const data = await response.json();
        setFilepath(data.filelocation)

        setFormData(prevState => ({
          ...prevState,
          story: data.filelocation
        }));

        dispatch(setUSERFULLINFO(formData))

        console.log(data.filelocation); 
      } catch (error) {
        console.error('Error uploading file:', error);
     
      }
  

    }

  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('Form Data:', formData);

    try {
      const response = await fetch("/api/uploadstory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Story uploaded successfully");

      } else {
        console.error("Error uploading story");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };



 
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if(fileInputRef.current)
      fileInputRef.current.click();
  };

  return (
    <div>
       
        <div className='w-16 h-16 rounded-full relative flex m-5 bg-black border-2 cursor-pointer'>
          <Link href={"/addstory"} className='w-16 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] h-16'/>
          <h1 className='w-16 h-16 text-center content-center text-3xl font-light'>+</h1>
        </div>

    </div>
  );
}

export default AddStories;
