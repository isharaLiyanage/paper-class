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
    <header className="  ">
      <div className="flex relative flex-wrap justify-between w-full ">
        <div className="flex relative w-3/12 gap-1 mt-2">
          <Link href="#">
            <Image src={facebook} width={24} height={24} alt="facebook icon" />
          </Link>
          <Link href="#">
            <Image src={tiktok} width={24} height={24} alt="tiktok icon" />
          </Link>
          <Link href="#">
            <Image
              src={instagram}
              width={24}
              height={24}
              alt="instagram icon"
            />
          </Link>
        </div>
        <div className="w-5/12 flex justify-center">
          {" "}
          {/* Center the Blog Site */}
          <h1 className="dark:text-gray-200 text-gray-800 text-2xl">
            <Link href="/">Blog Site</Link>
          </h1>
        </div>
        <div className="flex  m-auto self-center w-4/12 dark:text-gray-100">
          <div className="mx-1 cursor-pointer">
            <DarkModeToggle />
          </div>
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
            side
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
                      profileOpen ? "absolute" : "hidden"
                    } px-3 py-2 right-0 sm:left-0 w-20 bg-slate-100 rounded-sm border border-cyan-200`}
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
                <Link href="/login" className=" ">
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
