"use client";

import QuizForm from "@/components/write/quizForm";

import { useSession } from "next-auth/react";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FormEventHandler, useEffect, useState } from "react";

const Page = () => {
  const [title, setTitle] = useState<string>();
  const [image, setImage] = useState<File | null>(null);
  const [desc, setDesc] = useState<string>();
  const [questions, setQuestions] = useState<any>([]);
  const [numQuestion, setNumQuestion] = useState<any>(null);
  const { data, status } = useSession();
  const route = useRouter();
  if (status == "unauthenticated") {
    route.push("/");
  }

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectImage = event.target.files?.[0] || null;
    setImage(selectImage);
  };

  const setQuestion = (quiz: string) => {};
  const addQuiz = (quiz: any) => {
    console.log(quiz);
    setQuestions([...questions, quiz]);
  };
  console.log(questions);
  console.log(numQuestion);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", image || "");
    data.append("upload_preset", "upload");
    const uploadRes = await fetch(
      "https://api.cloudinary.com/v1_1/de0uvxaje/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const url = await uploadRes.json();
    console.log(url);
    await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        desc,
        img: url.url,

        questions: questions,
      }),
    });
  };
  return (
    <section className=" m-auto w-10/12">
      <div>
        <input
          type="file"
          onChange={handleImage}
          accept="image/*"
          name="image"
          id=""
        />
        <div className=" w-full md:w-8/12  m-auto h-60 relative border border-green-400 rounded-sm ">
          {image && (
            <Image
              src={URL.createObjectURL(image)}
              objectFit="cover"
              alt={title || ""}
              fill
            />
          )}
        </div>

        <div className="mt-6">
          <input
            type="text"
            className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline outline-blue-100"
            placeholder="Add Title..."
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="mt-6">
          <input
            type="text"
            className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline outline-blue-100"
            placeholder="Add Desc..."
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />
        </div>
        <p className=" text-right mt-2">
          Number Of Questions : {questions.length}
        </p>
        <div className="py-1">
          <div className="">
            {questions.map((item: any, key: number) => (
              <div key={key} className="">
                <strong className="  font-sans font-bold">
                  {key + 1} {item.quiz}
                </strong>
                <div className=" flex flex-wrap justify-between">
                  {item.answers?.map((e: string) => (
                    <p
                      key={e}
                      className={`${
                        e == item.correctAnswer ? "font-bold" : "font-normal"
                      } font-mono`}
                    >
                      {e}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <QuizForm addQuiz={addQuiz} />
        </div>
        <button
          className="bg-blue-500 fixed right-6 top-6 text-white py-2 px-4 rounded"
          type="submit"
          onClick={handleSubmit}
        >
          POST
        </button>
      </div>
    </section>
  );
};

export default Page;
