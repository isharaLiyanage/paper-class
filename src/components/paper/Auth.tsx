"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function Auth({ children }: any) {
  const { data, status } = useSession();
  const router = useRouter();
  if (status == "unauthenticated") {
    return (
      <div className=" md:h-96 flex self-center">
        <div className=" m-auto flex flex-col items-center  w-[33%] max-md:w-full max-md:ml-0">
          <div className="shadow-2xl bg-white flex  grow flex-col mx-auto p-16 rounded-[63px] max-md:mt-10 max-md:px-5 max-md:py-24">
            <div className="text-indigo-900 text-center text-xl font-medium self-center w-full">
              Please log in to access this content
            </div>
            <Link
              href="/login"
              className=" mt-2  text-center px-5 border bg-white hover:bg-blue-200 transition duration-500 ease-in border-blue-50  rounded-2xl my-1 py-1 "
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>{children}</div>;
  }
}

export default Auth;
