"use client";

import { logout } from "@/store/actions";
import { useGSAP } from "@gsap/react";
import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import { getAuth } from "firebase/auth";
import { gsap } from "gsap";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";





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


const Navbar = () => {
  const router = useRouter();

  const isDarkMode = useSelector((state : any) => state.rootReducer.isDarkMode);
  const backColor = isDarkMode ? "dark-mode-bg" : "light-mode-bg"
  const dispatch = useDispatch()

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");

    try {
      firebaseAuth.signOut()
      dispatch(logout())

   } catch (error) {
     console.error('');
   }
  };

  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);

  const handleMenuMouseOver = () => {
    setIsMouseOver(true);
  };

  const handleMenuMouseLeave = () => {
    setIsMouseOver(false);
  };

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMouseOver) {
      gsap.to(divRef.current, {
        width: 258,
      });

      gsap.from(".menu-anime", { x: -100, opacity: 0, stagger: 0.1 });
    } else {
      gsap.to(divRef.current, {
        width: 90,
      });
    }
  });

  useGSAP(() => {
    gsap.from(".nav-left", {
      x: -100,
      opacity: 0,
      delay: 1,
    });
  });

  return (
    <>
      <div
        ref={divRef}
        onMouseOver={handleMenuMouseOver}
        onMouseLeave={handleMenuMouseLeave}
        className="nav-left w-20 h-screen flex flex-col fixed rounded-xl left-0 top-0 glass-blur text-white z-10"
      >
        <div
          className={`${
            isDarkMode ? "text-white" : "text-black"
          } flex list-none flex-col mt-40 gap-8 ml-1`}
        >
          <div className="menuelement flex">
            <li className="menu">
              <Link href="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
              </Link>
            </li>
            <div className={`self-center ml-4 menu-anime`}>
              <Link href="/">
                <h1>{isMouseOver && `${"Home"}`}</h1>
              </Link>
            </div>
          </div>

          <div className="menuelement flex">
            <li className="menu flex">
              <Link href="/chat">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
                  />
                </svg>
              </Link>
            </li>
            <div className={`self-center ml-4 menu-anime`}>
              <Link href="/api/chat">
                <h1>{isMouseOver && `${"Chat"}`}</h1>
              </Link>
            </div>
          </div>

          <div className="menuelement flex">
            <li className="menu">
              <Link href="/notification">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                  />
                </svg>
              </Link>
            </li>
            <div className={`self-center ml-4 menu-anime`}>
              <Link href="/notification">
                <h1>{isMouseOver && `${"Notification"}`}</h1>
              </Link>
            </div>
          </div>

          <div className="menuelement flex">
            <li className="menu">
              <Link href="/account">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </Link>
            </li>
            <div className={`self-center ml-4 menu-anime`}>
              <Link href="/account">
                <h1>{isMouseOver && `${"Account"}`}</h1>
              </Link>
            </div>
          </div>

          <div className="menuelement flex">
            <li className="menu">
              <Link href="/settings?switchChange=true">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </Link>
            </li>
            <div className={`self-center ml-4 menu-anime`}>
              <Link href="/settings">
                <h1>{isMouseOver && `${"Settings"}`}</h1>
              </Link>
            </div>
          </div>

          <div className="menuelement flex">
            <li className="bg-black text-white w-12 h-12 rounded-full m-[1rem] mt-20">
              <Link href="/logout">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 m-auto mt-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                  />
                </svg>
              </Link>
            </li>
            <div className="mt-[5.7rem]">
              <a href="/api/logout" onClick={handleLogout}>
                <span className="self-center menu-anime">
                  {isMouseOver && `${"Logout"}`}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
