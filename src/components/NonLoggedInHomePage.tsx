"use client";

import Login from "@/app/login/page";
import Register from "@/app/register/page";
import React, { useRef, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import * as THREE from "three";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
  faGithub,
  faChrome,
} from "@fortawesome/free-brands-svg-icons";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";

interface Props {
  handleIsLoggedIn: () => void;
}

const NonLoggedInHomePage = () => {
  const pathname = usePathname();
  const router = useRouter();
  const ref = useRef();

  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mount.current === null) return;
    const scene = new THREE.Scene();
    const aspectRatio = window.innerWidth / (3 * window.innerHeight); // Adjusted aspect ratio for doubled height
    const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, 2 * window.innerHeight);
    mount.current.appendChild(renderer.domElement);

    const planeGeometry = new THREE.PlaneGeometry(
      window.innerWidth,
      2 * window.innerHeight,
      32,
      32
    );
    const planeMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
    }); // Ensure both sides of the plane are visible
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    scene.add(plane);

    const sphereGeometry = new THREE.SphereGeometry(1, 128, 128);
    const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });

    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    const light1 = new THREE.PointLight(0xbf3d9f, 2);
    const light2 = new THREE.PointLight(0x0000ff, 1);
    const light3 = new THREE.PointLight(0xbf3d9f, 2);

    const lighty = 0;
    const lightz = -0.7;

    light1.position.set(-2, lighty, lightz);
    light2.position.set(0, lighty, lightz);
    light3.position.set(2, lighty, lightz);

    scene.add(light1);
    scene.add(light2);
    scene.add(light3);

    sphere.position.y = 0;
    sphere.scale.y = 3;
    sphere.scale.x = 2;
    sphere.scale.z = 3;

    plane.position.x = 0;
    plane.position.y = -2;
    plane.position.z = -2;

    camera.position.y = 2.5;
    camera.position.z = 4;

    const animate = function () {
      requestAnimationFrame(animate);

      sphere.rotation.x += 0.01;

      const scrollY = window.scrollY;
      light1.position.y = scrollY * 0.01;
      light2.position.y = scrollY * 0.01;
      light3.position.y = scrollY * 0.01;

      const time = performance.now() / 80000;
      const movement = Math.sin(time * Math.PI) * 15;
      const lightDistance = 4;

      light1.position.x = Math.cos(movement) * lightDistance;
      light2.position.x =
        Math.cos(movement + (Math.PI * 2) / 3) * lightDistance;
      light3.position.x =
        Math.cos(movement + (Math.PI * 4) / 3) * lightDistance;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      // mount.current.removeChild(renderer.domElement);
    };
  }, []);

  const handleScroll = () => {
    // Update background scrolling speed
    const scrollY = window.scrollY;
    if(mount.current)
      mount.current.style.transform = `translateY(-${scrollY * 0.5}px)`; // Adjust the factor to control the speed of background scrolling
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const redirectToLogin = () => {
    window.location.href = "/login";
  };
  const redirectToRegister = () => {
    window.location.href = "/register";
  };
  const redirectToPrivacy = () => {
    window.location.href = "/privacy";
  };
  const scrollToAboutUs = () => {
    const aboutUsSection = document.getElementById("about-us-section");
    if (aboutUsSection) {
      window.scrollTo({
        top: aboutUsSection.offsetTop,
        behavior: "smooth",
      });
    }
  };
  const scrollToContactUs = () => {
    const contactUsSection = document.getElementById("contact-us-section");
    if (contactUsSection) {
      window.scrollTo({
        top: contactUsSection.offsetTop,
        behavior: "smooth",
      });
    }
  };
  const scrollToFeature = () => {
    const featureSection = document.getElementById("feature-section");
    if (featureSection) {
      window.scrollTo({
        top: featureSection.offsetTop,
        behavior: "smooth",
      });
    }
  };
  const scrollToHome = () => {
    const homeSection = document.getElementById("home-section");
    if (homeSection) {
      window.scrollTo({
        top: homeSection.offsetTop,
        behavior: "smooth",
      });
    }
  };

  useGSAP(() => {
    const el = ref.current;
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

  const [usersCount, setUsersCount] = useState(0);

  useEffect(() => {
    const countUsers = async () => {
      try{
        const res = await axios.get("/api/countusers");
        setUsersCount(res.data.count)
      }
      catch{
        console.log("ERROR COUNTING USERS");
      }
    }
  
    countUsers();

  }, [])

  const [postCount, setPostCount] = useState(0);

  useEffect(() => {
    const countPosts = async () => {
      try{
        const res = await axios.get("/api/countposts");
        setPostCount(res.data.count)
      }
      catch{
        console.log("ERROR COUNTING POSTS");
      }
    }
  
    countPosts();

  }, [])


  return (
    <>
      <div className="main m-0 p-0 relative">
        <div ref={mount} className="absolute top-0 left-0 z-[-1]"></div>
        <div className="p-6 w-[60%] m-auto text-zinc-400">
          <ul className="flex justify-around">
            <li className={pathname == "/" ? "text-zinc-100 gsap" : "text-zinc-400 gsap"}>
              {" "}
              {/* <Link href={"/"}>Home</Link>{" "} */}
              <a href="#" onClick={scrollToHome}>
                Home
              </a>
            </li>
            <li
            className={
              pathname == "/features" ? "text-zinc-100 gsap" : "text-zinc-400 gsap"
            }
            >
              {" "}
              {/* <Link href={"/features"}>Features</Link>{" "} */}
              <a href="#" onClick={scrollToFeature}>
                Features
              </a>
            </li>
            <li
            className="text-zinc-400 gsap"
            >
              {" "}
              {/* <Link href={"/contact"}>Contact Us</Link>{" "} */}
              <a href="#" onClick={scrollToContactUs}>
                Contact Us
              </a>
            </li>
            <li
            className="text-zinc-400 gsap"
            >
              <a href="#" onClick={scrollToAboutUs}>
                About Us
              </a>

              {/* <Link href = {"/about"} >About</Link> */}
            </li>
          </ul>
        </div>
        <div
          id="home-section"
          className="title gsap mt-28 text-center text-[6rem] tracking-[1rem] text-white"
        >
          SAAQI
          <h1 className="mt-0 text-[1.1rem] gsap tracking-widest text-zinc-400">
            Make your confession
          </h1>
          <h1 className="mt-32 gsap text-[1rem] tracking-widest text-zinc-100">
            It's secure and adorable
          </h1>
        </div>
      </div>
      <div className="a mt-[50vh] h-[500vh] bg-black">
        <div className="a mt-[50vh] w-screen h-[500vh] bg-black">
          <div className="h11 flex gap-1 justify-center">
            <div className="box1 gsap h-20">
              <button
                id="toggleButton"
                className="inline-flex   items-center px-12 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-[#111827] hover:bg-[#1e293b] focus:border-[#6b7280] active:bg-[#6b7280] transition ease-in-out duration-150"
              >
                <span>{usersCount}+ </span>
                <svg
                  id="arrowIcon"
                  className="h-5 w-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>{" "}
                </svg>
              </button>
              <h6 className="text-gray-50 text-sm ml-10 mt-3">Total Users</h6>
            </div>

            <div className="box2 gsap w-64 ml-8 h-20">
              <button
                id="toggleButton"
                className="inline-flex items-center px-20 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-[#111827] hover:bg-[#1e293b] focus:border-[#6b7280] active:bg-[#6b7280] transition ease-in-out duration-150"
              >
                <span>{postCount}+</span>
                <svg
                  id="arrowIcon"
                  className="h-5 w-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>{" "}
                </svg>
              </button>
              <h6 className="text-gray-50 mt-3 text-sm ml-20">Total Posts</h6>
            </div>

            <div className="box3 gsap">
              <button
                id="toggleButton"
                className="inline-flex items-center px-8 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-[#111827] hover:bg-[#1e293b] focus:border-[#6b7280] active:bg-[#6b7280] transition ease-in-out duration-150"
              >
                <span>16 April 2024</span>

                <svg
                  type="dropdown"
                  id="arrowIcon"
                  className="h-5 w-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>{" "}
                </svg>
              </button>
              <h6 className="text-gray-50 mt-3 ml-10 text-sm">
                withdrawal date
              </h6>
            </div>
          </div>

          <div className=" w-96 mx-auto ">
            <div className="circle gsap text-center bg-gradient-to-r from-fuchsia-500 to-pink-500 rounded-full w-20 h-20 mt-24 m-auto"></div>
            <h1 className="text-gray-50 gsap text-6xl  mt-28 m-auto  ">
              INSPIRATION
            </h1>
          </div>

          <div className="BadaBoxes flex m-20 justify-evenly">
            <div className="box1 gsap ">
              <div className="box text-gray-50 tracking-wider rounded-lg w-[20vw] h-[20vw] bg-gradient-to-r from-slate-500 to-slate-800">
                <div className=" rounded-md flex flex-col text-center mx-auto  justify-evenly item-center text-gray-50 bg-[#111827]  tracking-wider w-[20vw] h-[20vw]">
                  <div className="button1  ml-6 w-64 h-14 items-center px-14 py-4 border border-transparent text-base leading-6 font-medium rounded-lg text-white bg-gradient-to-r from-orange-400 to-rose-400 shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)]  cursor-pointer">
                    Highlights
                  </div>
                  <div className="button1 ml-6 w-64 h-14 items-center px-14 py-4 border border-transparent text-base leading-6 font-medium rounded-lg text-white bg-gradient-to-r from-orange-400 to-rose-400 shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)] cursor-pointer">
                    Analytics
                  </div>
                  <div className="button1 ml-6 w-64 h-14 items-center px-14 py-4 border border-transparent text-base leading-6 font-medium rounded-lg text-white bg-gradient-to-r from-orange-400 to-rose-400 shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)] cursor-pointer">
                    Direct Message
                  </div>
                  <div className="button1 ml-6 w-64 h-14 items-center px-14 py-4 border border-transparent text-base leading-6 font-medium rounded-lg text-white bg-gradient-to-r from-orange-400 to-rose-400 shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)] cursor-pointer">
                    Posts
                  </div>
                  <div></div>
                </div>
              </div>
              <h2 className="text-gray-50 ml-14 mt-4 text-xl">
                Aesthetic Features
              </h2>
            </div>

            <div className="box2 gsap ">
              <div className="box rounded-lg flex flex-col text-center mx-auto  justify-evenly item-center text-gray-50 bg-[#111827]  tracking-wider w-[20vw] h-[20vw] ">
                <div className="button1 ml-6 w-64 h-14 items-center px-14 py-4 border border-transparent text-base leading-6 font-medium rounded-lg text-white bg-gradient-to-r from-gray-700 to-black">
                  Select Your Tier
                </div>
                <div className="button2 mb-2 w-64 h-14 ">
                  <select
                    className="text-white bg-black opactity-0 border-none mb-2 ml-6 w-64 h-14 text-lg items-center pl-20 px-14 py-4 border border-transparent text-base leading-6 font-medium rounded-lg text-white bg-gradient-to-b from-gray-900 to-gray-600"
                    name="select"
                    id="users"
                  >
                    <option className="border-none pl-6 bg-black" value="150">
                      Premium
                    </option>
                    <option className="border-none bg-black" value="200">
                      Standard
                    </option>
                  </select>
                </div>
                <div
                  onClick={redirectToLogin}
                  // className="button3 mt-4 ml-6 w-64 rounded-full h-14 items-center px-8 py-4 border border-transparent text-base leading-6 font-medium text-center  text-white bg-gradient-to-r from-rose-700 to-pink-600 hover:bg-gradient-to-r from-fuchsia-500 to-cyan-500 focus:border-[#6b7280] active:bg-[#6b7280] transition ease-in-out duration-150"
                >
                  <button
                    type="button"
                    className="text-white mt-4 ml-4 w-64 rounded-full h-14 items-center px-8 py-4 border border-transparent text-base leading-6 font-medium text-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800   me-2 mb-2"
                  >
                    LOGIN
                  </button>
                </div>
              </div>
              <h2 className="text-gray-50 ml-14 mt-4 text-xl">
                Start your Journey
              </h2>
            </div>

            <div className="box3 gsap">
              <div className="box  shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] rounded-lg text-gray-50 tracking-wider w-[20vw] h-[20vw] bg-gradient-to-r from-slate-900 to-slate-700">
                <div className="flex pt-2 flex-col gap-3">
                  <button className="shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset] relative ml-6 w-64 h-14 items-center px-14 py-4 border border-transparent text-base leading-6 font-medium  inline-flex text-white bg-black  justify-center p-0.5 mb-2 me-2 overflow-hidden   rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75   rounded-md ">
                      Privacy
                    </span>
                  </button>
                  <button className="shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)] relative ml-6 w-64 h-14 items-center px-14 py-4 border border-transparent text-base leading-6 font-medium  inline-flex text-white bg-black  justify-center p-0.5 mb-2 me-2 overflow-hidden   rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75   rounded-md ">
                      Confidentiality
                    </span>
                  </button>
                  <button className="shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)] relative ml-6 w-64 h-14 items-center px-14 py-4 border border-transparent text-base leading-6 font-medium  inline-flex text-white bg-black  justify-center p-0.5 mb-2 me-2 overflow-hidden   rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75   rounded-md ">
                      Protection
                    </span>
                  </button>
                  <button className="shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)] relative ml-6 w-64 h-14 items-center px-14 py-4 border border-transparent text-base leading-6 font-medium  inline-flex text-white bg-black  justify-center p-0.5 mb-2 me-2 overflow-hidden   rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75   rounded-md ">
                      Secrecy
                    </span>
                  </button>
                </div>
              </div>
              <div className="text-gray-50 ml-20 mt-4 cursor-pointer text-xl">
                Privacy and Safety
              </div>
            </div>
          </div>
          {/* JAKARTA TYPOGRAPHY */}
          <div className="description pt-10 bg-black text-white justify-center text-center grid gap-20 ">
            <h1 className="text-4xl gsap">EXCELLENCY</h1>
            <h1
              id="about-us-section"
              className="text-6xl gsap brightness-200  contrast-200 bg-gradient-to-t from-pink-500 via-violet-600 to-rose-600 bg-clip-text text-transparent "
            >
              SAAQI
            </h1>
            <p className="font-[sathosi] gsap font-2xl">
              <b className="font-[Time-new-Roman] gsap text-xl">
                Introducing Saaqi{" "}
              </b>{" "}
              <br /> A vibrant social media platform designed to <br /> connect
              people through shared experiences and creative expression. <br />{" "}
              Saaqi offers a plethora of features to enrich users' digital
              interactions. <br />
              From captivating photo band video sharing to immersive Stories and
              live streaming, Saaqi empowers users to express themselves
              authentically. <br /> <br />
              <br />{" "}
              <p className="text-2xl gsap">
                Join Saaqi today and embark on a journey of creativity,
                connection, and community.
              </p>
            </p>
            <h3 className="text-3xl bg-gradient-to-t gsap from-teal-300 via-rose-500 to-violet-800 bg-clip-text text-transparent">
              ADVANCE
            </h3>
            <div className="btns flex justify-center text-center gap-20">
              <button className="color gsap bg-gradient-to-r from-teal-400 to-yellow-100 rounded-full py-4 px-20 text-center bg-center ">
                Documentation
              </button>
              <button
                onClick={redirectToRegister}
                className="color bg-gradient-to-r gsap from-purple-500 to-teal-500 rounded-full py-4 px-20 text-center bg-center"
              >
                Register
              </button>
              <button
                onClick={redirectToPrivacy}
                style={{ cursor: "pointer" }}
                className="color bg-gradient-to-r gsap from-yellow-400 to-rose-600 rounded-full py-4 px-20 text-center bg-center "
              >
                Privacy Policy
              </button>
            </div>
          </div>

          {/* tricky and wizardry first */}
          <div className="flex mt-32 justify-around bg-black text-white">
            <div className="left-vala ml-20 flex flex-col gap-20">
              <h1
                id="feature-section"
                className="text-6xl capitalize gsap leading-32 mt-20 leading-20"
              >
                {" "}
                🌟 Radiate positivity, <br />
                🌍 Inspire wanderlust, <br />
                🤝 Connect.
              </h1>
              <p className="leading-loose gsap">
                Its sleek interface encourages <br /> seamless navigation and
                discovery, <br />
                while robust privacy controls ensure users feel secure in their
                online presence. <br /> Saaqi fosters community through likes,
                comments, and direct messaging, <br /> facilitating meaningful
                connections and conversations. <br /> Additionally, Saaqi's
                Explore page curates personalized
              </p>
              <button className="button3 gsap w-96 rounded-md h-14 items-center px-10 py-4 border border-transparent text-base  font-medium text-center  text-white bg-gradient-to-r from-rose-700 to-purple-600 hover:bg-gradient-to-r from-fuchsia-500">
                Know More
              </button>
            </div>

            <div className="w-96 h-96 gsap mt-20">
              <img
                src="https://images.unsplash.com/photo-1495001258031-d1b407bc1776?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJpZW5kcyUyMHdpdGglMjBzb2NpYWwlMjBtZWRpYXxlbnwwfHwwfHx8MA%3D%3D"
                alt=""
              />
            </div>
          </div>

          {/* tricky and wizardry second*/}
          <div className="flex mt-32 justify-around bg-black text-white">
            <div className="w-96 h-32 mt-20">
              <img
                src="https://images.unsplash.com/photo-1522098543979-ffc7f79a56c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGZyaWVuZHN8ZW58MHx8MHx8fDA%3D"
                alt=""
              />
            </div>

            <div className="left-vala ml-20 flex flex-col gap-20">
              <h1 className="text-6xl gsap mt-20 leading-20">
                Explore, Dream, Discover 🌍
              </h1>
              <p className="gsap">
                Embracing the magic of everyday moments! 🌟
                <br /> Life's beauty lies in the simplest of things - a morning
                sunrise, <br /> a cup of coffee shared with loved ones, <br />{" "}
                or a walk in nature's embrace. <br /> Each day brings new
                adventures and opportunities to create lasting memories. <br />
                Let's savor these moments, cherish the laughter, and <br />{" "}
                celebrate the journey together! 📸 Whether <br />
                it's exploring new places, indulging in delicious meals,
                <br /> or finding joy in small acts of kindness, let's embrace
                the beauty that surrounds us. <br />
                Join me on this journey of discovery and gratitude,
                <br /> where every moment is a chance to experience the wonder
                of life. <br /> Here's to living fully, laughing often, and
                loving endlessly! <br />
                💖✨ #EmbraceTheMagic #CherishTheJourney #LiveLaughLove !
              </p>
              <button className="button3 gsap mt-4 w-96 rounded-md h-14 items-center px-10 py-4 border border-transparent text-base leading-6 font-medium text-center  text-white bg-gradient-to-r from-rose-700 to-purple-600 hover:bg-gradient-to-r from-fuchsia-500">
                EXPLORE
              </button>
            </div>
          </div>

          {/* footer */}
          <footer
            id="contact-us-section gsap"
            className="bg-black  text-white justify-center text-center py-32"
          >
            <div className="footer-row flex text-wrap justify-between gap-10 p-10">
              <div className="footer-col">
                <h1 className="text-white size-3 ml-28 font-semibold font-sans">
                  Info
                </h1>
                <ul className="links mt-10 ml-[5.5rem] list-none">
                  <li>
                    <a
                      className="no-underline text-slate-400 hover:text-white text-sm"
                      href="../FooterTags/About.tsx"
                    >
                      About us
                    </a>
                  </li>
                  <li>
                    <a
                      className="no-underline text-slate-400 hover:text-white text-sm"
                      href="#"
                    >
                      Customers
                    </a>
                  </li>
                  <li>
                    <a
                      className="no-underline text-slate-400 hover:text-white text-sm"
                      href="#"
                    >
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a
                      className="no-underline text-slate-400 hover:text-white text-sm"
                      href="#"
                    >
                      Services
                    </a>
                  </li>
                  <li>
                    <a
                      className="no-underline text-slate-400 hover:text-white text-sm"
                      href="#"
                    >
                      Career
                    </a>
                  </li>
                  <li>
                    <a
                      className="no-underline text-slate-400 hover:text-white text-sm"
                      href="#"
                    >
                      Collections
                    </a>
                  </li>
                </ul>
              </div>
              <div className="footer-col">
                <h1 className="text-white size-3 ml-5 font-semibold font-sans">
                  Explore
                </h1>
                <ul className="links mt-10 list-none">
                  <li>
                    <a
                      className="no-underline text-slate-400 hover:text-white text-sm "
                      href="#"
                    >
                      Latest Design
                    </a>
                  </li>
                  <li>
                    <a
                      className="no-underline text-slate-400 hover:text-white text-sm "
                      href="#"
                    >
                      Themes
                    </a>
                  </li>
                  <li>
                    <a
                      className="no-underline text-slate-400 hover:text-white text-sm "
                      href="#"
                    >
                      New Upload
                    </a>
                  </li>
                  <li>
                    <a
                      className="no-underline text-slate-400 hover:text-white text-sm "
                      href="#"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      className="no-underline text-slate-400 hover:text-white text-sm "
                      href="#"
                    >
                      Android
                    </a>
                  </li>
                  <li>
                    <a
                      className="no-underline text-slate-400 hover:text-white text-sm "
                      href="#"
                    >
                      Windows
                    </a>
                  </li>
                </ul>
              </div>
              <div className="footer-col">
                <h1 className="text-white size-3 ml-10 font-semibold font-sans">
                  Legal
                </h1>
                <ul className="links mt-10 list-none">
                  <li>
                    <a
                      className="no-underline text-slate-400 hover:text-white text-sm "
                      href="#"
                    >
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a
                      className="no-underline text-slate-400 hover:text-white text-sm "
                      href="#"
                    >
                      Licensing
                    </a>
                  </li>
                  <li>
                    <a
                      className="no-underline text-slate-400 hover:text-white text-sm "
                      href="#"
                    >
                      New Upload
                    </a>
                  </li>
                  <li>
                    <a
                      className="no-underline text-slate-400 hover:text-white text-sm "
                      href="#"
                    >
                      Discord Server
                    </a>
                  </li>
                  <li>
                    <a
                      className="no-underline text-slate-400 hover:text-white text-sm "
                      href="#"
                    >
                      Brand Center
                    </a>
                  </li>
                  <li>
                    <a
                      className="no-underline text-slate-400 hover:text-white text-sm "
                      href="#"
                    >
                      Terms & Conditions
                    </a>
                  </li>
                </ul>
              </div>
              <div className="footer-col">
                <h1 className="text-white size-3 ml-32 font-semibold font-sans">
                  Newletter
                </h1>
                <p className="mt-10 mr-20 text-sm text-slate-200">
                  Saqi brings the latest, sip by sip, Stay refreshed with <br />{" "}
                  our news, don't skip. Updates, trends, and <br /> stories
                  untold, <br />
                  Subscribe now, let the tales unfold. <br />
                </p>
                <form className="flex mt-4   gap-7" action="#">
                  <input
                    className="h-9 rounded-md bg-none bg-black w-140 caret-white text-white pl-4 outline-none border-solid border-2 border-[#7489C6]"
                    type="email"
                    placeholder="Your Email"
                    required
                  />
                  <button
                    className="glow-on-hover bg-black text-white hover:text-white hover:bg-transparent active:bg-black active:text-white relative z-10 rounded-lg"
                    type="submit"
                  >
                    SUBSCRIBE
                  </button>
                </form>
                <div className="icons flex mt-6 gap-10 cur rounded-smsor-pointer">
                  <FontAwesomeIcon
                    className="text-[#fff] text-2xl rounded-full cursor-pointer"
                    icon={faFacebook}
                    size="2x"
                  />
                  <FontAwesomeIcon
                    className="text-[#fff] text-2xl rounded-full cursor-pointer"
                    icon={faTwitter}
                    size="2x"
                  />
                  <FontAwesomeIcon
                    className="text-[#fff] text-2xl rounded-full cursor-pointer"
                    icon={faInstagram}
                    size="2x"
                  />
                  <FontAwesomeIcon
                    className="text-[#fff] text-2xl rounded-full cursor-pointer"
                    icon={faLinkedin}
                    size="2x"
                  />
                  <FontAwesomeIcon
                    className="text-[#fff] text-2xl rounded-full cursor-pointer"
                    icon={faGithub}
                    size="2x"
                  />
                </div>
              </div>
            </div>
            <h1 className="text-white  mt-24">
              © 2024 Saaqi. All Rights Reserved.
            </h1>
          </footer>
        </div>
      </div>
    </>
  );
};

export default NonLoggedInHomePage;
