"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Feed from "./sub_components/Feed";
import Post from "./sub_components/Post";
import Stories from "./sub_components/Stories";
import Search from "./sub_components/Search";
import UserAccount from "./sub_components/UserComponent";
import Navbar from "./sub_components/Navbar";
import { useDispatch, useSelector } from "react-redux";


import { GoogleAuthProvider,GithubAuthProvider, getAuth, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { useFirebase } from '@/context/Firebase';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database'
import { setTEMPUSER, setUSERFULLINFO } from "@/store/actions";
import axios from "axios";
import Storypopup from "./sub_components/Storypopup";

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




function Homepage() {

  const TEMPUSER = useSelector(state => state.rootReducer.tempUser)
  

  const isDarkMode = useSelector(state => state.rootReducer.isDarkMode);
  const backColor = isDarkMode ? "dark-mode-bg" : "light-mode-bg"

  const dispatch = useDispatch();

  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  let [googleLogged, setGoogleLogged] = useState<boolean>(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (user) => {
      if(user){
        setUser(user);
        const res = await axios.get(`api/findUserByEmail?email=${user.email}`)
        dispatch(setUSERFULLINFO(res.data.user));
        setGoogleLogged(true)
        dispatch(setTEMPUSER(user));
        console.log("TEMP USER: ", TEMPUSER)
      }
      else{
        setUser("");
      }
    })
  }, [])



  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user/');
        if (response.ok) {
          const data = await response.json();
          
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


  useGSAP(() => {
    gsap.from(".friends", {
      x: 100,
      opacity: 0,
      delay: 1,
    });
  });

  const isStoryActive = useSelector(state => state.rootReducer.isStoryClicked)

  return (
    <>
    <Navbar/>

      {/* {isStoryActive === true && <Storypopup />} */}


      <div className={`${backColor} flex w-screen min-h-screen`}>
        <div
          className={` w-[77%] flex flex-col no-scrollbar pl-32`}
        >
          <Stories />
          <Post isDarkMode={isDarkMode} />
          <Feed isDarkMode={isDarkMode} />
        </div>

        <div className="friends glass-blue">
          <div className="search">
            <Search isDarkMode={isDarkMode} />
          </div>

          <div
            className={`friends ${isDarkMode ? "text-white" : "text-black"}`}
          >
            <div className="header flex items-center justify-between">
              <h1 className="ml-5 text-xl font-semibold">Friends</h1>
              <Link href="/seemore">
                <div
                  className={`seemore flex items-center ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  <h4 className="text-sm pr-1">See more</h4>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 mr-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </div>
              </Link>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center gap-4">
            <UserAccount isDarkMode={isDarkMode} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
