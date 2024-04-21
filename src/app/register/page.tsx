"use client"

import { useState, ChangeEvent, FormEvent, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import gsap from 'gsap'
import { useGSAP } from '@gsap/react';
import toast from "react-hot-toast";


function Register() {
  const router = useRouter();

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

  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    profilePicture:""
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/tokenregister", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("User registered successfully");
        toast.success('User registered successfully', {
          position: 'bottom-right',
          style: {
            backgroundColor: "black",
            color: "white",
            border: "1px solid white"
          }
        });
        router.push("/login");
      } else {
        console.error("Error registering user");
        toast.error('Error registering user', {
          position: 'bottom-right',
          style: {
            backgroundColor: "black",
            color: "white",
            border: "1px solid white"
          }
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error('Error registering user', {
        position: 'bottom-right',
        style: {
          backgroundColor: "black",
          color: "white",
          border: "1px solid white"
        }
      });
    }
  };


  return (
    <>
      <div className="bg-[url(https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] w-screen h-[100vh] bg-cover">
        <div className="flex items-center justify-center blackShade h-[100vh] ">
          <div className="back h-full w-[100%]">
            <div className="h-10 w-[50%] flex  justify-between text-white ">
              <div className="logo h-10 w-10 rounded-full ml-32 mt-9 object-cover ">
                <h1 className="ml-14 text-2xl gsap font-bold">
                  SAAQI
                </h1>
              </div>
              <div className="flex gap-20 ml-[24rem] mr-8 mt-10 ">
                <a
                  href=""
                  className="text-slate-400 gsap hover:text-purple-700 "
                >
                  Home
                </a>
                <a
                  href=""
                  className="text-slate-400 gsap hover:text-purple-700"
                >
                  Join
                </a>
                <a
                  href=""
                  className="text-slate-400 gsap hover:text-purple-700 "
                >
                  Features
                </a>
                <a
                  href=""
                  className="text-slate-400 w-[10rem] gsap hover:text-purple-700"
                >
                  Contact Us
                </a>
              </div>
            </div>
            <div className="box flex flex-col items-center h-[85vh] w-[40vw] rounded-xl mt-[50px] ml-40 text-white">
              <div className="dets mt-[9%]  w-[90%] h-[70%] flex flex-col justify-center ">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col justify-center items-center gap-5 text-white  ">
                    <h1 className=" ml-[-1rem] mt-[5rem] font-semibold">
                      <h2 className="text-[13px] text-gray-400 ] gsap ">
                        STEP INTO THE WORLD OF CONFESSIONS
                      </h2>
                      <h1 className="w-50% text-[45px] gsap ">
                        Create New Account
                      </h1>
                      <h3 className="text-[14px] gsap flex">
                        Already have an Account?
                        <a
                          href="/login"
                          className="text-purple-700 font-semibold gsap ml-2"
                        >
                          Log In
                        </a>
                      </h3>
                    </h1>
                    <div className="gap-5 flex mr-10 mb-[-9px] ">
                      <input
                        type="text"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                        id="name"
                        placeholder="Full Name"
                        className="first w-[45%] gsap h-9 pl-5 font-[14px] text-[14px]  focus:outline-none placeholder-gray-200 bg-slate-800 rounded-xl"
                      />
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        id="uname"
                        placeholder="UserName"
                        className="last w-[35%] gsap h-9 p-4 pl-5 text-[14px] focus:outline-none placeholder-gray-200 bg-slate-800 rounded-xl"
                      />
                    </div>
                    <div className="gap-5 flex-col ml-14 ">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        id="email"
                        placeholder="Email"
                        className="email w-[69%] gsap h-9 text-[14px] mb-[0.8rem]  pl-6 mr-28 focus:outline-none placeholder-gray-200 bg-slate-800 rounded-xl "
                      />                
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        id="password"
                        placeholder="Password"
                        className="password w-[69%] gsap h-9 text-[14px] pl-6  mb-[0.8rem] focus:outline-none placeholder-gray-200 bg-slate-800 rounded-xl"
                      />
                      <input
                        type="password"
                        name="confirmpassword"
                        value={formData.confirmpassword}
                        onChange={handleChange}
                        id="password"
                        placeholder="Confirm Password"
                        className="password w-[69%] gsap h-9 text-[14px] pl-6 mr-28  focus:outline-none placeholder-gray-200 bg-slate-800 rounded-xl"
                      />
                    </div>
                    <div className="flex w-full mt-[-20px] ml-28 gap-6">
                      <Link href={"/other-methods-register"} className="method gsap w-[28%] h-9 p-2 text-center mt-7 bg-slate-500 text-white rounded-full text-[13px] font-semibold">Change Method</Link>
                      
                      <input
                        type="submit"
                        value="Next"
                        className="next w-[30%] h-9 p-2 mt-7 gsap bg-purple-900 text-white rounded-full text-[13px] font-semibold "
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
