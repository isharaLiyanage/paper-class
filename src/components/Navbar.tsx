"use client";
import React, { useState } from "react";
import facebook from "../../public/facebook.png";
import tiktok from "../../public/tiktok.png";
import profile from "../../public/person.png";

import instagram from "../../public/instagram.png";
import Image from "next/image";
import DarkModeToggle from "@/app/darkMode";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
const Navbar = () => {
  const { data, status } = useSession();
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  console.log(data?.user?.email);
  return (
    <header className="  m-auto bg-gradient-to-r  from-white to-[#21c8f64f] bg-inherit ">
      <div className="flex max-w-[1200px]  m-auto relative flex-wrap sm:flex-row flex-col self-center justify-between  ">
        <div className=" text-center">
          <h1 className="dark:text-gray-200 font-bold text-gray-800 text-2xl">
            <Link href="/">MCQMasterclass.com</Link>
          </h1>
        </div>
        <div className="flex justify-end self-center w-4/12 dark:text-gray-100">
          <div className="mx-1 cursor-pointer"></div>
          <div className="lg:flex text-[14px] hidden self-center  gap-2">
            <div className="ml-1">
              <Link href="/" className="">
                Home
              </Link>
            </div>

            <div className="ml-1">
              <Link href="/home" className=" ">
                Contact Us
              </Link>
            </div>

            <div className="ml-1">
              <Link href="/home" className=" ">
                About Us
              </Link>
            </div>
          </div>
          <div
            className=" lg:hidden"
            onClick={() => {
              setOpen(!open);
            }}
          >
            Navbar
          </div>
          <div className="md:mx-2  text-[14px]">
            {status ? (
              status == "authenticated" ? (
                <div className="relative">
                  <p className=" cursor-pointer  md:ml-2 mt-1 md:mt-0">
                    <Image
                      src={profile}
                      width={18}
                      height={18}
                      alt=" profile icon"
                      onClick={() => {
                        setProfileOpen(!profileOpen);
                      }}
                    />
                  </p>
                  <div
                    className={`${
                      profileOpen
                        ? "absolute translate-y-0 "
                        : "hidden  translate-y-8"
                    } px-3 py-2 md:-left-4 sm:left-0 w-20  transform  duration-1000 ease-in bg-slate-100  rounded shadow border border-cyan-200`}
                  >
                    <div className="">
                      <p>
                        <Link href={`/user/${data?.user?.email}`}>Profile</Link>
                      </p>
                      <p>
                        <Link href={`/marks/${data?.user?.email}`}>Marks</Link>
                      </p>
                      <p
                        className=" cursor-pointer "
                        onClick={() => {
                          signOut();
                        }}
                      >
                        log Out
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  href="/login"
                  className=" px-5 border bg-white hover:bg-blue-100 transition duration-500 ease-in border-blue-50  rounded-2xl my-1 py-1 "
                >
                  Login
                </Link>
              )
            ) : (
              ""
            )}
          </div>
        </div>
        {open ? (
          <div
            className=" w-full h-screen sidebar relative"
            onClick={() => {
              setOpen(false);
            }}
          >
            <NavbarSide />
          </div>
        ) : (
          ""
        )}
      </div>
    </header>
  );
};

export default Navbar;

export function NavbarSide() {
  return (
    <div className=" m-auto w-10/12 h-32 top-0 rounded-md  text-center dark:bg-slate-800  bg-slate-50 lg:hidden block self-center  gap-2">
      <div className="ml-1 mt-3 ">
        <Link href="/home" className="">
          Home
        </Link>
      </div>

      <div className="ml-1">
        <Link href="/home" className=" ">
          Contact Us
        </Link>
      </div>

      <div className="ml-1">
        <Link href="/home" className=" ">
          About Us
        </Link>
      </div>
    </div>
  );
}
