import Auth from "@/components/paper/Auth";
import Question from "@/components/paper/Question";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
const getData = async ({ id }: any) => {
  const res = await fetch(process.env.webUrl + `/api/paper/${String(id)}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw console.error("backend not working");
  }
  return res.json();
};
async function Page({ params }: any) {
  const questionArray = await getData(params);

  return (
    <Auth>
      <section className="m-auto w-10/12 h-screen">
        <strong>Paper</strong>
        <Question Question={questionArray} params={params.id} />
      </section>
    </Auth>
  );
}

export default Page;
