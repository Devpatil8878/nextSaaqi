"use client"

import { getDatabase, ref, set } from 'firebase/database'
import { app } from '../../../utils/firebase'
import React, { useEffect, useState } from 'react'
import { GoogleAuthProvider,GithubAuthProvider, getAuth, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { useFirebase } from '@/context/Firebase';
import { initializeApp } from 'firebase/app';
import Login from '../login/page'
import { useRouter } from 'next/navigation'
import { FacebookAuthProvider } from "firebase/auth";
import { toast } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout, toggleDarkMode, setUSER, setTEMPUSER } from '../../store/actions';
import { Fullscreen } from 'lucide-react';
import gsap from 'gsap'
import { useGSAP } from '@gsap/react';
import Image from 'next/image';


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
const facebookProvider = new FacebookAuthProvider();



const page = () => {

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

  const USER = useSelector((state : any) => state.rootReducer.user);
  const router = useRouter()
  const dispatch = useDispatch();



  useEffect(() => { 
    onAuthStateChanged(firebaseAuth, (user) => {
      if(user){
        dispatch(setUSER({
          fullname: user.displayName,
          email: user.email,
        }))  
        router.push("/account/edit-info")
        return false;
      }
    })
  }, [])

  
  const redirectToMain = () => {
    if(USER && Object.keys(USER).length > 0){
      router.push("/account/edit-info")
    }
  }

  const signupWithGoogle = () => {
    signInWithPopup(firebaseAuth, googleProvider)
    .then((result) => {
      const user = result.user;
      dispatch(setUSER({
        fullname: user.displayName,
        email: user.email,
      }));
      toast.success('User Registered Successfully', {
        position: 'bottom-right',
        style: {
          backgroundColor: "black",
          color: "white",
          border: "1px solid white"
        }
      });
    })
    .catch((error) => {
      console.error("Error signing up with Google: ", error);
      toast.error('Error signing up with Google', {
        position: 'bottom-right',
        style: {
          backgroundColor: "black",
          color: "white",
          border: "1px solid white"
        }
      });
    });
  }


  const signupWithFacebook = () => {
    signInWithPopup(firebaseAuth, facebookProvider)
  }



  return (
    <>
     <div className="bg-[url(https://images.unsplash.com/photo-1534531409543-069f6204c5b4?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] w-full h-[100vh]">
        <div className="flex items-center blackShade justify-center h-[100vh] ">
          <div className='back h-full w-[100%] '>
            <div className='h-10 w-[50%] flex  justify-between text-white '>
            <div className='logo gsap h-10 w-10 rounded-full ml-32 mt-9 '><h1 className='ml-14 text-2xl font-bold '>SAAQI</h1></div>
              <div className='flex gsap gap-20 ml-[24rem] mt-10 '>
                <a href='' className='text-slate-400 gsap hover:text-purple-700 '>Home</a>
                <a href='' className='text-slate-400 gsap hover:text-purple-700'>Join</a>
                <a href='' className='text-slate-400 gsap hover:text-purple-700 '>Features</a>
                <a href='' className='text-slate-400 w-[10rem] gsap hover:text-purple-700'>Contact Us</a>
              </div>
            </div>
            <div className="box flex flex-col transition-all items-center h-[80vh] w-[28vw] rounded-xl  text-white mt-24 ml-56">
              <div className="dets mt-[9%] transition-all  w-[90%] h-[70%] flex flex-col justify-center ">
              <h1 className='text-4xl font-semibold mb-10 gsap'>Register</h1>
                <button onClick={ USER && Object.keys(USER).length > 0 ? redirectToMain : signupWithGoogle} className='w-[18rem] flex items-center justify-center gsap h-[3rem] mb-3 rounded-full text-black bg-zinc-100'>
                  {<Image width={25} height={25} src={"https://e7.pngegg.com/pngimages/344/344/png-clipart-google-logo-google-logo-g-suite-google-text-logo-thumbnail.png"} alt='' className='mr-5'/>}
                  Signup With Google
                </button>

                <button onClick={USER ? redirectToMain : signupWithFacebook} className='w-[18rem] h-[3rem] rounded-full gsap text-black  items-center justify-center  flex bg-zinc-100'>
                  {<Image width={40} height={40} src={"https://e7.pngegg.com/pngimages/286/412/png-clipart-facebook-scalable-graphics-icon-facebook-logo-facebook-logo-blue-logo-thumbnail.png"} alt='' className='mr-3 ml-2'/>}
                  Signup With Facebook
                </button>
              </div>
              <div className="login-with flex gsap w-[80%] h-[15%] justify-center items-center gap-4 mt-4">

            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default page