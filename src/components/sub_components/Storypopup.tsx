
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
import { setSTORYCLICKED, setTEMPUSER, setUSERFULLINFO } from '@/store/actions';
import axios from 'axios';


const Storypopup = () => {

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

  
  const TEMPUSER = useSelector(state => state.rootReducer.tempUser)
  const dispatch = useDispatch()
  const FULLUSERINFO = useSelector(state => state.rootReducer.fullUserInfo)


  const [formData, setFormData] = useState({
    id: "",
    story: ""
  });


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

        setFormData(prevState => ({
            ...prevState,
            id: userinfo.data.user._id
        }));

          
      }
      else{
        
      }
    })
  }, [])

 

  let name = TEMPUSER.fullname
  let email = TEMPUSER.email




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

        console.log(data.filelocation); 

        setFormData(prevState => ({
          ...prevState,
          story: data.filelocation
        }));

        

        dispatch(setUSERFULLINFO(formData))

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

    dispatch(setSTORYCLICKED(false))
  };



 
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };


  return (   


    <div className='content-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10 h-[80vh] w-[25vw]'>

    <div className='w-[25vw] h-[80vh] m-auto content-center bg-black text-center border relative rounded-xl'>
        <button className='absolute border w-4 h-4 top-0 right-0 rounded-full translate-x-[20%] translate-y-[-30%] text-2xl font-light text-center text-white ' onClick={() => dispatch(setSTORYCLICKED(false))}>*</button>
        <form onSubmit={handleSubmit} className='flex-col gap-10 '>
            <div className={`prof relative border-2 w-20 h-20 rounded-full m-auto mb-10`}>
              <input onChange={handleFileChange} ref={fileInputRef} className='text-black hidden gsap' type="file" name="picture" id="picture" placeholder='' /><br /><br />
              <button className='gsap w-[100%] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-full h-[100%] cursor-pointer' type='button' onClick={handleButtonClick}></button>
              <h1 className='absolute top-[50%] left-[50%] text-3xl font-light translate-x-[-45%] translate-y-[-45%] cursor-pointer text-white'>+</h1>
            </div>

            <br/>
            <button className='w-[5vw] h-9 gsap cursor-pointer text-white bg-zinc-900 rounded-[8px] text-[14px]' type="submit" value="submit" >Submit</button>
        </form>
    </div>
    </div>




  )
}

export default Storypopup