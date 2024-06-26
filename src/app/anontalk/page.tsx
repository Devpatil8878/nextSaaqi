"use client"

import { usePathname } from 'next/navigation'
import Navbar from '@/components/sub_components/Navbar'
import React, { useEffect, useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDown, Info, Paperclip, Phone, Send, Video } from "lucide-react"
import io from 'socket.io-client';
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react';
import { login, setTEMPUSER, setUSER, setUSERFULLINFO } from '@/store/actions'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import axios from 'axios'
import mongoose from 'mongoose'

const socket = io()


let newMessages = [
  {
    id: 1,
    name: "Alex",
    profile: "https://images.unsplash.com/photo-1682687979601-082a1295b78f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    message: "Hi",
    isActive: true
  },
  {
    id: 2,
    name: "Axel",
    profile: "https://plus.unsplash.com/premium_photo-1676637656198-e2bbf752103a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8",
    message: "How are you doin'",
    isActive: true
  },
  {
    id: 1,
    name: "Axel",
    profile: "https://plus.unsplash.com/premium_photo-1676637656198-e2bbf752103a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8",
    message: "How are you doin'",
    isActive: false
  },
  {
    id: 2,
    name: "Axel",
    profile: "https://plus.unsplash.com/premium_photo-1676637656198-e2bbf752103a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8",
    message: "How are you doin'",
    isActive: true
  },
  {
    id: 1,
    name: "Axel",
    profile: "https://plus.unsplash.com/premium_photo-1676637656198-e2bbf752103a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8",
    message: "How are you doin'",
    isActive: true
  },
  {
    id: 1,
    name: "Axel",
    profile: "https://plus.unsplash.com/premium_photo-1676637656198-e2bbf752103a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8",
    message: "How are you doin'",
    isActive: true
  },
  {
    id: 2,
    name: "Axel",
    profile: "https://plus.unsplash.com/premium_photo-1676637656198-e2bbf752103a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8",
    message: "How are you doin'",
    isActive: true
  },
  {
    id: 2,
    name: "Axel",
    profile: "https://plus.unsplash.com/premium_photo-1676637656198-e2bbf752103a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8",
    message: "How are you doin'",
    isActive: false
  },
  {
    id: 1,
    name: "Alex",
    profile: "https://images.unsplash.com/photo-1682687979601-082a1295b78f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    message: "Hi",
    isActive: true
  },
  {
    id: 1,
    name: "Axel",
    profile: "https://plus.unsplash.com/premium_photo-1676637656198-e2bbf752103a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8",
    message: "How are you doin'",
    isActive: true
  },
  
]

let OldMessages = [
  {
    name: "Walter white",
    profile: "https://images.unsplash.com/photo-1711669670318-689b1cbfae70?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8",
    message: "Hi",
    isActive: true
  },
  {
    name: "Maverick",
    profile: "https://images.unsplash.com/photo-1711654106922-f44ee5df26ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8",
    message: "How are you doin'",
    isActive: true
  },
  {
    name: "John Wick",
    profile: "https://images.unsplash.com/photo-1711376330772-9117a7217694?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8",
    message: "How are you doin'",
    isActive: true
  },
  {
    name: "Walter white",
    profile: "https://images.unsplash.com/photo-1711669670318-689b1cbfae70?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8",
    message: "Hi",
    isActive: true
  },
  {
    name: "Maverick",
    profile: "https://images.unsplash.com/photo-1711654106922-f44ee5df26ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8",
    message: "How are you doin'",
    isActive: true
  },
  {
    name: "John Wick",
    profile: "https://images.unsplash.com/photo-1711376330772-9117a7217694?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8",
    message: "How are you doin'",
    isActive: true
  },
  
]

let Users = [
  {
    id: 1,
    name: "Luis",
    profile: "https://images.unsplash.com/photo-1711654106922-f44ee5df26ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8",
    bio: "What do you wanna know about me"
  },
  {
    id: 2,
    name: "Oggy",
    profile: "https://images.unsplash.com/photo-1711654106922-f44ee5df26ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8",
    bio: "Heeehehehehe..."
  },
  {
    id: 3,
    name: "Ninja Hatauri",
    profile: "https://images.unsplash.com/photo-1711654106922-f44ee5df26ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8",
    bio: "Ding Ding Ding Ding Ding"
  },
]

interface userType {
  sender: string
  content: string
  timestamp: Date
  currentUser: currentUser
  message: string
}


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

interface currentUser{
  _id: string
  fullname: string
  username: string
  email: string
  password: string
  confirmpassword: string
  profilePicture: string
  bio: string
  likes: [{}]
  posts: [{}]
  stories: [{}]
  followers: [{}]
  followings: [{}]

}

interface RootState {
  rootReducer: any;
  isLoggedIn: boolean;
  isDarkMode: boolean;
  user: User | null; // User can be null initially or after logout
  fullUserInfo: FullUserInfo | null; // FullUserInfo can be null initially or after logout
  tempUser?: TempUser; // Optional property for temporary user data
  isStoryClicked: boolean;
}

interface User {
}

interface FullUserInfo {
}

interface TempUser {
}

const Chat = () => {

   const TEMPUSER = useSelector((state: RootState)  => state.rootReducer.tempUser)
  

  const isDarkMode = useSelector((state: RootState)  => state.rootReducer.isDarkMode);
  const backColor = isDarkMode ? "dark-mode-bg" : "light-mode-bg"

  const dispatch = useDispatch();

  const [isLoggedIn,setIsLoggedIn] = useState(false);

  const [userData, setUserData] = useState<currentUser>({} as currentUser);
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
        setIsLoggedIn(true)
        dispatch(setTEMPUSER(user));
        console.log("TEMP USER: ", TEMPUSER)
        dispatch(setUSER(res.data.user))
        setUserData(res.data.user); 
        console.log("MY USER",res.data.user)
        console.log("USER DATA",userData)
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
          setIsLoggedIn(true)
          setUserData(data.user); 
          dispatch(login())
          dispatch(setUSER(data.user))
          console.log("MY LOCAL USER ",data.user)
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



  const router = useRouter();


useEffect(() => {
  if(!userData){
    router.push('/login')
  }
}, [userData])





  const [messages, setMessages] = useState<userType[] | undefined>([]);
  const [messageInput, setMessageInput] = useState('');
  const USER = useSelector((state: RootState)  => state.rootReducer.user);
  console.log(`current user: ${userData?.fullname}`)

  const pathname = usePathname()
  const isActive = (href: String) => pathname === href;

  const [bgColor, setBgColor] = useState('bg-zinc-800');

  const handleClick = () => {
    setBgColor(bgColor === 'bg-zinc-800' ? 'bg-[#268bf0]' : 'bg-zinc-800');
  };

  useEffect(() => {
    socket.on('chat message', message => {
        setMessages((prevMessages: any) => [...prevMessages, message]);
    });
    
  }, []);

  


  const sendMessage = () => {
    
    const messageWithUser = { userData, message: messageInput };
    if (messageInput.trim() !== '') {
      socket.emit('chat message', messageWithUser); // Send message to server
      setMessageInput(''); // Clear input field
    }
    console.log(messageWithUser)
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


  return (
    <>
    <Navbar />
        <div className="main chat-bg min-h-[100vh] max-h-[100vh] overflow-y-hidden flex w-[100vw]">
            <div className="left w-[30%] ml-[10rem] mt-12 flex-col overflow-y-scroll no-scrollbar ">
                <h1 className='text-[1.5rem] font-semibold gsap'>Chats</h1>
                
                <Collapsible>
                  <CollapsibleTrigger>
                  <div className="flex w-[22rem] justify-between gsap mb-4 items-center mt-8">
                    <h1 className='text-zinc-400 gsap'>New messages</h1>
                    <Button variant="ghost" size="sm" className="w-9 p-0">
                      <ChevronDown className="h-4 w-4 " />
                      <span className="sr-only">Toggle</span>
                    </Button>
                    </div>
                  </CollapsibleTrigger>

                  

                  <CollapsibleContent>
                  <div>
                    {
                      newMessages.map((elem, index) => (
                        <Link href={`/chat/${elem.name}`} key={index} className={`${
                            isActive(`/chat/${elem.name}`) ? "bg-[#268bf0]" : "chat-compo-bg"
                          } message gsap hover:drop-shadow-[0_35px_35px_rgba(38,139,240,0.45)] hover:bg-[#268bf0] w-[22rem] mb-4 h-[4.7rem] rounded-xl flex items-center`}
                        >
                          <span className='relative border-4 border-blue-500 ml-4 rounded-full'>
                            <img src={`${elem.profile}`} className="dp rounded-full w-[3.3rem] h-[3.3rem] object-cover" alt={`${elem.name}'s profile`} />
                            <span className={`w-4 h-4 border-2 border-zinc-600 absolute rounded-full top-0 right-0 ${elem.isActive ? "bg-green-400" : "bg-red-600"}`}></span>
                          </span>
                          <div className="dets flex-col ml-4">
                            <h1 className='font-semibold'>{elem.name}</h1>
                            <h2 className='font-light text-zinc-300 text-xs'>{elem.message}</h2>
                          </div>
                        </Link>
                      ))
                    }

                    </div>
                  </CollapsibleContent>
                
                </Collapsible>


                <Collapsible>
                  <CollapsibleTrigger>
                  <div className="flex w-[22rem] justify-between gsap mb-6 items-center mt-1">
                    <h1 className='text-zinc-400'>Last messages</h1>
                    <Button variant="ghost" size="sm" className="w-9 p-0">
                      <ChevronDown className="h-4 w-4 " />
                    </Button>
                    </div>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    {
                      OldMessages.map((elem, index) => (
                        <div key={index} className="message gsap hover:drop-shadow-[0_35px_35px_rgba(38,139,240,0.45)] hover:bg-[#268bf0] w-[22rem] mb-4 h-[4.7rem] rounded-xl chat-compo-bg flex items-center">
                          <img src={`${elem.profile}`} key={index} className="dp rounded-full w-[3.5rem] h-[3.5rem] ml-4 object-cover"></img>
                          <div key={index} className="dets flex-col ml-4">
                            <h1 className='font-semibold gsap'>{elem.name}</h1>
                            <h2 className='font-light text-zinc-300 text-xs gsap'>{elem.message}</h2>
                          </div>
                      </div>
                      ))
                    }
                  </CollapsibleContent>
                </Collapsible>
               

            </div>

            <div className="right flex-col relative w-[70%] ">
                    <div className='w-[90%] h-[4rem] flex gsap items-center justify-between rounded-xl m-auto mt-6  '>
                      <div className='flex items-center'>
                        <img src={`${Users[0].profile}`} className="dp rounded-full w-[3rem] h-[3rem] ml-4"></img>
                        <div className="dets flex-col ml-4">
                          <h1 className='font-semibold text-sm'>{Users[0].name}</h1>
                          <h2 className='font-light text-zinc-300 text-[0.7rem]'>{Users[0].bio}</h2>
                        </div>
                      </div>
                      <div className='flex gap-5 '>
                        <Phone />
                        <Video />
                        <Info />
                      </div>
                    </div>

                    <div className="flex-grow-reverse chat-profile-shadow overflow-y-scroll no-scrollbar overflow-x-hidden py-10 pb-32 gap-10 px-14 mt-3 chat-bg-image fill-transparent w-[90%] h-[85%] m-auto rounded-2xl">
                       <div className="overlay"></div>
                      {messages?.map((ele: any, index: any)=>{
                        return (
                          <div className={`flex ${ele.userData.fullname == userData?.fullname ? "justify-end" : "justify-start" } mt-7 h-5 z-10`} key={index}>
                            <a href="" key={index} className={`relative h-10 text-sm self-center content-center px-5 rounded-2xl ${ele.userData.fullname == userData?.fullname  ? "bg-[#268bf0] rounded-br-none" : "bg-[#424656] rounded-bl-none" } `}>
                              {ele.message}
                              <div className={`text-[0.7rem] gsap bottom-[-1rem] ${ele.userData.fullname == userData?.fullname ? "" : "w-[10rem]"} absolute text-zinc-400 ${ele.userData.fullname == userData?.fullname ? "right-0" : "left-0"}`}>
                                {ele.userData.fullname == userData?.fullname ? "You" : ele.userData.fullname}
                              </div>
                            </a>
                          </div>
                        )
                      })}

                      <div className='absolute flex justify-evenly items-center bottom-5 left-[50%] translate-x-[-50%] h-[10%] w-[85%] rounded-xl  bg-zinc-700'>
                        <input type="text" value={messageInput} onChange={(e) => setMessageInput(e.target.value)} className='w-[85%] relative px-20 py-2 h-12 rounded-full bg-zinc-900' placeholder='Type here...'/>
                        <Paperclip className='absolute left-12 text-zinc-300'/>
                        <button onClick={sendMessage} className='cursor-pointer'>
                          <Send />
                        </button>
                      </div>

                    </div>
            </div>
        </div>
    </>
  )
}

export default Chat