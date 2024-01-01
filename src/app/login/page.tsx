"use client";
import React from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
function Page() {
  const { data, status } = useSession();
  const route = useRouter();

  if (status == "loading") {
    return <div className=" m-auto">Loading...</div>;
  }
  if (status == "authenticated") {
    route.push("/");
  }
  return (
    <section className=" min-h-[400px]">
      <div className="flex w-10/12 md:w-6/12 py-11 bg-lime-950 justify-center m-auto">
        <div className="">
          <div className=" cursor-pointer my-1 px-5 py-2 bg-slate-300">
            <p onClick={() => signIn("google")}>Sign in with Google</p>
          </div>
          <div className=" cursor-not-allowed my-1 px-5 py-2  bg-violet-400">
            <p>Sign in with Github</p>
          </div>
          <div className=" cursor-not-allowed my-1 px-5 py-2  bg-neutral-400">
            <p>Sign in with Facebook</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page;
