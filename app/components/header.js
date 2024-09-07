"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import NavBar from "./navbar";
import NavBar2 from "./navbar2";
import Link from "next/link";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";

const Header = () => {
  const [toggled, setToggled] = useState(false);

  useEffect(() => {
    const element = document.getElementById("section");
    if (element) {
      if (toggled) {
        element.style.display = "block";
      } else {
        element.style.display = "none";
      }
    }

    return () => {
      if (element) {
        element.style.display = "none"; // Cleanup or reset if needed
      }
    };
  }, [toggled]);

  // useEffect(() => {
  //   const element = document.getElementById('section')
  //   if (element) {
  //       element.style.display = 'none' // Cleanup or reset if needed
  //     // }
  //   }
  // })

  return (
    <>
      <div
        id="header"
        className="fullscreen sticky px-2 shadow-md w-full h-[40px]"
      >
        <div className="flex justify-between items-center">
          <Link className="flex" href="/">
            <div className="relative flex items-center">
              <Image
                src="/logo.svg"
                width={25}
                height={25}
                alt="Picture of the author"
                className="content "
              />
              <span className="text-[24px] font-serif text-[#efc75e] webkit stroke ">
                GameChanger Academy
              </span>
            </div>
          </Link>
          <NavBar />
        </div>

        <div className="user-section">
          {/* {user ? (
                    <div className="user-info">
                        Welcome, {user.username}!
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <button onClick={handleLogin}>Login</button>
                )} */}
        </div>
        <div className="search-bar">
          {/* Include your search bar component */}
        </div>
      </div>
      {/* <NavBar2 /> */}
    </>
  );
};

export default Header;
