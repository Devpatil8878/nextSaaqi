"use client"

import { useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Link from 'next/link';
import Image from 'next/image';

interface Post {
  username: string;
  image: string;
  post: string;
  date: string;
}

interface FeedProps {
  isDarkMode: boolean;
}

function Feed({ isDarkMode }: FeedProps) {
  

  useGSAP(()=>{
    gsap.from(".feed-animation",{
        y:100,
        opacity:0,
        stagger:0.5, 
        delay:1
    })
})


const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await fetch('/api/feed');
        if (!response.ok) {
          throw new Error('Failed to fetch feed');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching feed:', error);
      }
    };

    fetchFeed();
  }, []);


  const handleDoubleClick = () => {

  }



  return (
    <>
      {posts.map((elem : any, index) => (
        <div key={index} className={`${isDarkMode ? "dark-mode-component-bg" : "light-mode-component-bg"} hover:drop-shadow-[0_20px_20px_rgba(58,20,80,0.65)] feed-animation w-[90%] flex-col h-auto mx-10 mt-10 rounded-xl overflow-y-auto`}>
          <div className="flex account-info justify-between">
            <div className="flex mt-3">
              <Link href={`/user/${elem.user.username}`}>
                <div className='w-12 h-12 flex justify-center items-center rounded-full m-5 ml-8 mr-3 min-w-12'>
                  <img className='object-cover w-full h-full rounded-full ' src={`${elem.user.profilePicture}`} alt={elem.user.username} />
                </div>
              </Link>
              <Link href={`/user/${elem.user.username}`}>
                <div className="name flex-col mt-6 ml-6">
                  <h1 className='text-md font-semibold'>{`${elem.user.fullname}`}</h1>
                  <h4 className='text-xs'>{`${elem.createdAt}`}</h4>
                </div>
              </Link>
            </div>
            <Link href={`/dotmenu`}>
              <div className="threedots">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white m-10 ml-20">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                </svg>
              </div>
            </Link>
          </div>

          <div className='ml-[3rem] mb-10 pr-20 '>
            {elem.content}
          </div>

          <div className={`${!elem.image ? 'hidden' : ''} flex `}>
            <Image src={elem.image} onDoubleClick={handleDoubleClick} height={500} width={700} alt='a' className='rounded-lg m-auto my-10'/>
          </div>
        </div>
      ))}
    </>
  );
}

export default Feed;
