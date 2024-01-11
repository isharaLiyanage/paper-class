import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

import React, { useEffect, useState } from "react";

function Log({ display }: any) {
  const [err, setErr] = useState<string | string[]>();
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      setErr(error);
    }
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      signIn(
        "credentials",

        {
          email,
          password,
        }
      );
    } catch (error: any) {}
  };
  return (
    <div
      className={`${
        display === true ? "block" : "hidden"
      } sign-form-animation `}
    >
      <form
        action=" "
        onSubmit={handleSubmit}
        className="    text-[#6666667a]  "
      >
        <label htmlFor="email" className="mb-2">
          Email
        </label>{" "}
        <br />
        <input
          className="max-w-[186px] rounded border border-[#6666667a]"
          type="email"
          name="email"
          placeholder=""
        />{" "}
        <br />
        <label htmlFor=" pass"> Password </label>
        <br />
        <input
          className=" max-w-[186px] rounded border border-[#6666667a]"
          type="password"
          name="pass"
          placeholder=""
        />
        <br />
        <button
          type="submit"
          className=" border hover:bg-blue-500 hover:text-white border-blue-400 rounded  m-auto mt-3 px-4 py-1"
        >
          Sign Up
        </button>
        {err && <p className=" text-red-500">{err}</p>}
      </form>
    </div>
  );
}

export default Log;
