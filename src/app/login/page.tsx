"use client";
import React, { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Sign from "@/components/login/Sign";
import Log from "@/components/login/log";

function Page() {
  const [toggle, setToggle] = useState(false);
  const { data, status } = useSession();
  const route = useRouter();

  if (status == "loading") {
    return <div className=" m-auto">Loading...</div>;
  }
  if (status == "authenticated") {
    route.push("/");
  }
  return (
    <section className=" ">
      <div className="min-h-[400px] flex h-screen  w-full justify-center items-center">
        <div className="flex w-10/12 md:w-6/12 py-11 rounded sm:border border-[#80808075] bg-[#ffffff] justify-center m-auto transition-transform duration-150">
          <div className="">
            <div className=" w-72 overflow-hidden">
              <div className=" ">
                <Sign display={toggle} />
                <Log display={!toggle} />
              </div>
            </div>
            <p
              onClick={() => {
                setToggle(!toggle);
              }}
              className="cursor-pointer"
            >
              {toggle
                ? "already has account ? click here...."
                : "Create account ? click here"}
            </p>
            <p className=" my-3 text-center">Or</p>
            <div className=" cursor-pointer my-1 px-5 py-2 border border-[#6666667a] rounded bg-slate-300">
              <p onClick={() => signIn("google")}>Sign up with Google</p>
            </div>
            <div className=" cursor-not-allowed my-1 px-5 py-2 border border-[#6666667a] rounded  bg-violet-400">
              <p>Sign up with Github</p>
            </div>
            <div className=" cursor-not-allowed my-1 px-5 py-2 border border-[#6666667a] rounded  bg-neutral-400">
              <p>Sign up with Facebook</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page;
