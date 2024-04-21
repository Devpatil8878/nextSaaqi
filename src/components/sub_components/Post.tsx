"use client"

import Link from 'next/link';
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


interface PostProps {
  isDarkMode: boolean;
}

const Post: React.FC<PostProps> = ({ isDarkMode }) => {

  const router = useRouter()
  const fileInputRef = useRef(null);

  const [postContent, setPostContent] = useState<string>('');

  const USERINFO = useSelector(state => state.rootReducer.fullUserInfo)
  const FULLUSERINFO = useSelector(state => state.rootReducer.fullUserInfo)

  const [userEmail, setUserEmail] = useState();

  const [formData, setFormData] = useState({
    content: "",
    email: "",
    image: ""
  });


 useEffect(() => {
  const changeEmail = () => {
    // Check if the email has changed before updating the state
    if (USERINFO.email !== formData.email) {
      setFormData(prevState => ({
        ...prevState,
        email: USERINFO.email
      }));
      setUserEmail(USERINFO.email)
      
    }
  }
  
  changeEmail();

}, [USERINFO]); // Include USERINFO in the dependency array

  


  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  
  const handleFileChange = async (event) => {
    console.log("IMAGEUSER: ",FULLUSERINFO)
    const userString = JSON.stringify(FULLUSERINFO);

    const file = event.target.files?.[0];
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

        setFormData(prevState => ({
          ...prevState,
          image: data.filelocation
        }));

        // dispatch(setUSERFULLINFO(formData))

        console.log(data.filelocation); 
        toast.success('File uploaded successfully', {
          position: 'bottom-right',
          style: {
            backgroundColor: "black",
            color: "white",
            border: "1px solid white"
          }
        });
      } catch (error) {
        console.error('Error uploading file:', error);
        toast.error('Error uploading file', {
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

  const handleContentChange = (e) => {
    setPostContent(e.target.value)
    setFormData(prevState => ({
      ...prevState,
      content: e.target.value
    }));
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setUserEmail(USERINFO.email)

    console.log("EMAIL:::",userEmail)


    try {
      const response = await fetch('/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log("USERINFO::: ", USERINFO)
      

      if (response.ok) {
        console.log('Post submitted successfully');
        toast.success('Post submitted successfully', {
          position: 'bottom-right',
          style: {
            backgroundColor: "black",
            color: "white",
            border: "1px solid white"
          }
        });
        
      } else {
        console.error('Error submitting post');
        toast.error('Error submitting post', {
          position: 'bottom-right',
          style: {
            backgroundColor: "black",
            color: "white",
            border: "1px solid white"
          }
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useGSAP(()=>{
    gsap.from(".post-animation", {
        y: 50,
        opacity: 0,
        delay:1
    })
})

const fullUserInfo = useSelector(state => state.rootReducer.fullUserInfo)

  return (
    <>
      <div className={`${isDarkMode ? "bg-zinc-900" : "light-mode-component-bg"} hover:drop-shadow-[0_20px_20px_rgba(58,20,80,0.65)]  post-animation w-[90%] h-40 rounded-xl mx-10 flex flex-col`}>
        <form onSubmit={handleSubmit}>
          <div className="text flex">
            <Link href="/account">
             
                <div className='w-12 h-12 flex justify-center items-center rounded-full m-5 ml-8 mr-3 min-w-12'>
                  <img className='object-cover w-full h-full rounded-full ' src={fullUserInfo.profilePicture} />
                </div>
            
            </Link>

            <textarea
              name="postText"
              value={postContent}
              onChange={(e) => handleContentChange(e)}
              id="posttext"
              cols={80}
              rows={3}
              placeholder="What's on your mind?"
              className="peer h-[60%] min-h-[50%] w-[75%] resize-none outline outline-0 transition-all disabled:resize-none mt-6 bg-transparent rounded-xl px-6 py-2 no-scrollbar"
            ></textarea>

            <div className="threedots ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white m-10 ml-20">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
              </svg>
            </div>
          </div>
          <div className="options flex justify-between">
            <div className="flex">
            <input onChange={handleFileChange} ref={fileInputRef} className='text-black hidden gsap' type="file" name="picture" id="picture" placeholder='' />
              
              <button type='button' onClick={handleButtonClick} className={`w-8 h-8 global-theme-color flex justify-center items-center rounded-full ml-10 mb-11 min-w-8`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`text-white w-4 h-4`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                </svg>
              </button>


            </div>

            <button type='submit' className='w-16 mr-12 text-white h-8 global-theme-color flex justify-center items-center rounded-md ml-4 mb-11 min-w-8'>
              Post
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Post;
