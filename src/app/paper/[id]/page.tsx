import { WebUrl } from "@/components/WebUrl";
import Question from "@/components/paper/Question";
import React from "react";
const getData = async ({ id }: any) => {
  const res = await fetch(WebUrl + `/api/paper/${String(id)}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw console.error("backend not working");
  }
  return res.json();
};
async function page({ params }: any) {
  const questionArray = await getData(params);

  return (
    <section className="m-auto w-10/12 h-screen">
      <strong>Paper</strong>
      <Question Question={questionArray} params={params.id} />
    </section>
  );
}

export default page;
