"use client"

import { useRouter } from "next/navigation";
import LoggedInHomePage from '../components/LoggedInHomePage';
import NonLoggedInHomePage from '../components/NonLoggedInHomePage';
import { useEffect, useMemo } from "react";
import * as React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { login, logout, setTEMPUSER, setUSER, setUSERFULLINFO } from '../store/actions/index';
import {Suspense} from 'react'


import { GoogleAuthProvider,GithubAuthProvider, getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database'
import axios from "axios";



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



const Home = () => {

  const isLoggedIn = useSelector((state : any) => state.rootReducer.isLoggedIn);
  const dispatch = useDispatch();


  useEffect( () => {
    (
      async () => {
        const LocomotiveScroll = (await import('locomotive-scroll' as any)).default;
        const locomotiveScroll = new LocomotiveScroll();
      }
    )()
  }, [])

    const router = useRouter();

    const TEMPUSER = useSelector((state : any) => state.rootReducer.tempUser)

    useEffect(() => {
      onAuthStateChanged(firebaseAuth, async (user) => {
        if(user){
          dispatch(login())
          dispatch(setUSER({
            fullname: user.displayName,
            email: user.email,
          }))  
          
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
          dispatch(logout())
        }
        console.log("checked user")
      })
    }, [])


    const temp = useSelector((state : any) => state.rootReducer.fullUserInfo)
    console.log("USER FOUND: ", temp)



    useEffect(() => {
      const checkAuthentication = async () => {
        try {
          const response = await fetch('/api/');
          if (response.ok) {
            dispatch(login())
          }
        } catch (error) {
          console.error('Error checking authentication:', error);
          router.push('/login');
        }
        console.log("checked for local")
      };
  
      checkAuthentication();
    }, []);

    useEffect(() => {
      const checkUser = async () => {
        try {
          const response = await fetch('/api/user');
          if (response.ok) {
            const data = await response.json();
            dispatch(setUSER({
              fullname: data.user.fullname,
              email: data.user.email,
            })) 
            dispatch(setUSERFULLINFO({
              fullname: data.user.fullname,
              email: data.user.email,
              username: data.user.username,
              bio: data.user.bio,
              profilePicture: data.user.profilePicture
            })) 
            console.log(data.user)
          }
        } catch (error) {
          console.error('Error checking authentication:', error);
          router.push('/login');
        }
        console.log("checked for User")
        
      };
  
      checkUser();
    }, []);

    
    const renderedComponent = useMemo(() => {
      
        if (isLoggedIn) 
          return (
            <Suspense >
              <LoggedInHomePage />;
            </Suspense>
          )
        else 
          return (
            <Suspense >
              <NonLoggedInHomePage />;
            </Suspense>
          )
      
    }, [isLoggedIn]);
    
    


    return renderedComponent;
  };


export default Home;
