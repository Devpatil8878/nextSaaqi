"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap'
import toast from 'react-hot-toast';

interface FormData {
  email: string;
  password: string;
}


const Login = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        console.log('User logged in successfully');
        toast.success('User Logged in Successfully', {
          position: 'bottom-right',
          style: {
            backgroundColor: "black",
            color: "white",
            border: "1px solid white"
          }
        });
        router.push("/");
      } else {
        const data = await response.json();
        console.log(data.message || 'Error logging in');
        toast.error(data.message, {
          position: 'bottom-right',
          style: {
            backgroundColor: "black",
            color: "white",
            border: "1px solid white"
          }
        });
      }
    } catch (error: any) {
      console.error('Error:', error);
      console.log('Internal Server Error');
      toast.error(error, {
        position: 'bottom-right',
        style: {
          backgroundColor: "black",
          color: "white",
          border: "1px solid white"
        }
      });
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
                <form onSubmit={handleSubmit}>
                  <div className="flex  flex-col justify-center items-start gap-5 text-white ">
                    <h1 className='text-4xl gsap mt-10 font-semibold mr-48 pr-16'>
                      <h1 className='text-[13px] gsap text-slate-700'>WELCOME BACK</h1>
                      Login </h1>
                    <div className='items-start '>
                      <a className='text-[13px] gsap text-zinc-300 '> Don't have an Account?</a> <a href="/register" className='text-[13px] gsap text-purple-700 font-semibold'>Register</a>
                    </div>
                    <input type="email" value={formData.email} onChange={handleChange} name="email" id="email" placeholder='Email' className='Email gsap w-[90%] h-9 p-4 pl-6 bg-slate-800 rounded-[8px] focus:outline-none placeholder-gray-200 mb-[-10px] text-[14px]' />
                    <input type="password" value={formData.password} onChange={handleChange} name="password" id="password" placeholder='Password' className='Password gsap w-[90%] h-9 p-4 pl-6 bg-slate-800 rounded-[8px] focus:outline-none placeholder-gray-200 text-[14px]' />
                    <div className="flex gap-[5.2rem] gsap ">
                      <a href="/forget-password" className='text-[13px] text-zinc-300'>Forget Password?</a>
                    </div>
                    <div className='flex gap-5 h-full w-[100%] ml-1'>
                      <Link href={"/other-methods"} className='w-[10vw] gsap text-center h-10 p-2 pt-[0.7rem] text-[13px] font-semibold mt-[-6px] bg-slate-500 text-white rounded-full' >Change Method</Link>
                      <input type="submit" value="Submit" className='w-[10vw] gsap h-10 ml-2 p-2 text-[13px] font-semibold mt-[-6px] bg-purple-700 hover:bg-slate-500 hover:scale-105text-white rounded-full' />
                    </div>
                  </div>
                </form>
              </div>
              <div className="login-with flex w-[80%] h-[15%] justify-center items-center gap-4 mt-4">

            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);
};

export default Login;
