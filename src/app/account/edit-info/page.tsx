"use client"

import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import User from '../../../../models/User'; 
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useGSAP } from '@gsap/react';
import { GoogleAuthProvider,GithubAuthProvider, getAuth, onAuthStateChanged, } from "firebase/auth";
import gsap from 'gsap'
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database'
import { setTEMPUSER, setUSERFULLINFO } from '@/store/actions';
import axios from 'axios';
import { toast } from 'react-hot-toast';

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


function UserDetails() {

  const router = useRouter()
  const fileInputRef = useRef(null);

  const [file, setFile] = useState<File>();
  const [status, setStatus] = useState('');

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const TEMPUSER = useSelector(state => state.rootReducer.tempUser)
  const dispatch = useDispatch()
  const FULLUSERINFO = useSelector(state => state.rootReducer.fullUserInfo)


  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (user) => {
      if(user){
        dispatch(setTEMPUSER(user))
        const userinfo = await axios.get(`/api/findUserByEmail?email=${user.email}`)
          
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
    fullname: name,
    username: "",
    email: email,
    password: "",
    bio: "",
    profilepicture: ""
  });

  const [filepath, setFilepath] = useState("");

  const handleFileChange = async (event) => {
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
          profilepicture: data.filelocation
        }));

        dispatch(setUSERFULLINFO(formData))

        toast.success('File Uploaded Successfully', {
          position: 'bottom-right',
          style: {
            backgroundColor: "black",
            color: "white",
            border: "1px solid white"
          }
        });

        console.log(data.filelocation); 
      } catch (error) {
        console.error('Error uploading file:', error);
        toast.error('Error uploading file:', {
          position: 'bottom-right',
          style: {
            backgroundColor: "black",
            color: "white",
            border: "1px solid white"
          }
        });
     
      }
    }

  };

  const handleUsernameChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      username: e.target.value
    }));

    setFormData(prevState => ({
      ...prevState,
      fullname: name
    }));
  
    setFormData(prevState => ({
      ...prevState,
      email: email
    }));

  
  };

  const handleBioChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      bio: e.target.value
    }));

  }


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('Form Data:', formData);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("User registered successfully");

        
        router.push("/");
      } else {
        console.error("Error registering user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };



  useGSAP(() => {
    var tl = gsap.timeline();
    tl.from(".gsap", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: 'gsap',
        scroller: "el",
        scrub: 3
      }
    });
  });

  console.log(formData)


  return (
    <div className='content-center h-screen bg-black'>
    <div className='w-[75vw] h-[80vh] m-auto content-center bg-black text-center border rounded-xl'>
        <form onSubmit={handleSubmit} className='flex-col gap-10 '>
            <div className={`prof relative bg-[url(${formData.profilePicture === "" || "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"}) border-2 w-20 h-20 rounded-full m-auto mb-10`}>
              <input onChange={handleFileChange} ref={fileInputRef} className='text-black hidden gsap' type="file" name="picture" id="picture" placeholder='' /><br /><br />
              <button className='gsap w-[100%] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-full h-[100%] cursor-pointer' type='button' onClick={handleButtonClick}></button>
              <h1 className='absolute top-[50%] left-[50%] text-3xl font-light translate-x-[-45%] translate-y-[-45%] cursor-pointer text-white'>+</h1>
            </div>
            
            <div className="names justify-center items-center flex gap-5 ">
              <input className='w-[18%] h-9 p-4 pl-6 gsap bg-zinc-900 rounded-[8px] focus:outline-none mb-[-5px] placeholder-zinc-500 text-[14px]' type="text" name='name' placeholder={TEMPUSER.fullname} disabled />
              <input className='w-[16%] h-9 p-4 pl-6 gsap bg-zinc-900 rounded-[8px] focus:outline-nonemb-[-5px] placeholder-gray-200 text-white text-[14px]' type="text" name='username' placeholder='Username' onChange={handleUsernameChange} required />
            </div>
            <br/>
            <input className='w-[36%] h-9 p-4 gsap pl-6 text-white bg-zinc-900 rounded-[8px] focus:outline-none placeholder-zinc-500 mb-[-10px] text-[14px]' type="email" name="email" id="email" placeholder={TEMPUSER.email}  /><br /><br />
            <input className='w-[36%] h-9 p-4 gsap pl-6 text-white bg-zinc-900 rounded-[8px] focus:outline-none placeholder-gray-200 mb-[-10px] text-[14px] ' type="text" name="bio" id="bio" onChange={handleBioChange} placeholder='Bio' /><br /><br />
            <button className='w-[10%] h-9 gsap cursor-pointer text-white bg-zinc-900 rounded-[8px] text-[14px]' type="submit" value="submit" >Submit</button>
        </form>
    </div>
    </div>
  )
}

export default UserDetails