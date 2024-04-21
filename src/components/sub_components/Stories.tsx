import React, { useEffect, useState } from 'react';
import AddStories from './AddStories';
import WatchStories from './WatchStories';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import axios from 'axios';

interface Story {
  username: string;
  storyImage: string;
  date: string;
}

function Stories(): JSX.Element {
  const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    const getStories = async () => {
      try {
        const res = await axios.get("/api/findstories");
        console.log("STORIES: ", res.data)
        setStories(res.data);
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };

    getStories();
  }, []);

  useGSAP(() => {
    gsap.from(".story-class", { x: 100, opacity: 0, duration: 1, delay: 1 });
  });

  return (
    <>
      <div className="story-class gradient-border m-10 glass-blur flex w-[90%] overflow-x-auto no-scrollbar rounded-xl min-h-24">
        <AddStories />
        {stories?.map((story, index) => (
          <WatchStories key={index} user={story.user} image={story.story} />
        ))}
      </div>
    </>
  );
}

export default Stories;
