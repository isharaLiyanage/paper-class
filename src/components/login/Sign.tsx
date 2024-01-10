"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Sign({ display }: any) {
  const [err, setErr] = useState<string>();
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  // collect data and fetch to backend
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const pass = e.target[2].value;
    const conformPassword = e.target[3].value;

    if (pass === conformPassword) {
      const password = conformPassword;

      try {
        setLoading(true);
        const res = await fetch("/api/auth/register", {
          method: "POST",
          body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json();
        console.log(data);
        if (data.status === 500) {
          setErr(data.massage);
        }
        data.status === 201 &&
          signIn("credentials", {
            email,
            password,
          });
        setLoading(false);
      } catch (error: any) {
        setErr(error);
      }
    } else {
      setErr("Passwords do not match");
    }
  };
  console.log(err);
  return (
    <div
      className={`${
        display === true ? "block" : "hidden"
      }  sign-form-animation`}
    >
      <form
        action=" "
        onSubmit={handleSubmit}
        className="   text-[#6666667a]  "
      >
        <label htmlFor="name" className="  mb-2 ">
          Name
        </label>{" "}
        <br />
        <input
          className="max-w-[186px] rounded border border-[#6666667a]"
          type="text"
          name="name"
          placeholder=""
        />{" "}
        <br />
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
        <label htmlFor="password">Conform password</label>
        <br />
        <input
          className="max-w-[186px] rounded border border-[#6666667a]"
          type="password"
          name="password"
          placeholder=""
        />{" "}
        <br />
        <button
          type="submit"
          className={`${
            loading ? "cursor-wait  bg-blue-100" : "cursor-pointer"
          } " border hover:bg-blue-500 hover:text-white border-blue-400 rounded  m-auto mt-3 px-4 py-1"`}
        >
          Sign Up
        </button>
        {err && <p className=" text-red-500">{err}</p>}
      </form>
    </div>
  );
}

export default Sign;
