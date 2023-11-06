"use client";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Timer from "./Timer";
interface Question {
  id: string;
  quiz: string;
  answers: string[];
}
function Question({ Question, params }: any) {
  console.log(params);
  const [answers, setAnswer] = useState({});
  const [marks, setMarks] = useState();

  const onChangeAnswer = (id: string, answers: string) => {
    setAnswer((prevSelectedAnswers: any) => ({
      ...prevSelectedAnswers,
      [id]: answers,
    }));
  };
  console.log(answers);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    console.log("ddd");
    const res = await fetch(`/api/paper/`, {
      method: "POST",
      body: JSON.stringify({ params, answers }),
    });

    const data = await res.json();
    setMarks(data?.mark?.marks);
  };

  return (
    <div>
      <div className="flex justify-around">
        {marks ? <p>Marks:{marks}</p> : <Timer />}
      </div>
      <form action="" onSubmit={handleSubmit}>
        {Question.paper.map((item: Question, key: number) => (
          <div className=" ml-4" key={item.id}>
            <strong>
              {" "}
              <span>{Number(key + 1) + "."}</span> {item.quiz}
            </strong>
            <div className="   list-decimal flex w-60 flex-wrap  justify-between  gap-2">
              {item.answers.map((answers: any, key) => (
                <div key={key} className=" ">
                  <input
                    type="radio"
                    value={answers}
                    id={String(key)}
                    name={item.id}
                    required
                    onChange={() => {
                      onChangeAnswer(item.id, answers);
                    }}
                  />
                  <label htmlFor="html">{answers}</label>
                </div>
              ))}
            </div>
          </div>
        ))}
        <button
          className=" px-5 py-3 disabled:bg-blue-100  disabled:text-blue-200  rounded bg-blue-500 shadow  shadow-transparent"
          type="submit"
          disabled={marks ? true : false}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Question;
