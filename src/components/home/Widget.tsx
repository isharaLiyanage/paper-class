import React from "react";

function Widget() {
  return (
    <div className="px-5 py-2">
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
        <div className="flex flex-col items-stretch w-[33%] max-md:w-full max-md:ml-0">
          <div className="shadow-2xl bg-white flex  grow flex-col mx-auto p-16 rounded-[63px] max-md:mt-10 max-md:px-5 max-md:py-24">
            <div className="text-indigo-900 text-center text-xl font-medium self-center w-full">
              Engaging Quiz Experience
            </div>
            <div className="text-gray-500 text-center  leading-9 self-stretch mb-0 mt-2 max-md:mb-2.5">
              Immerse yourself in our interactive quiz platform, where you can
              test your knowledge and challenge yourself with a variety of
              questions
            </div>
          </div>
        </div>

        <div className="flex flex-col items-stretch w-[33%] max-md:w-full max-md:ml-0">
          <div className="shadow-2xl bg-white flex  grow flex-col mx-auto p-16 rounded-[63px] max-md:mt-10 max-md:px-5 max-md:py-24">
            <div className="text-indigo-900 text-center text-xl font-medium self-center w-full">
              Instant Scoring Feedback
            </div>
            <div className="text-gray-500 text-center  leading-9 self-stretch mb-0 mt-2 max-md:mb-2.5">
              Receive immediate feedback on your performance as you complete
              quizzes, helping you track your progress and identify areas for
              improvement
            </div>
          </div>
        </div>

        <div className="flex flex-col items-stretch w-[33%] max-md:w-full max-md:ml-0">
          <div className="shadow-2xl bg-white flex  grow flex-col mx-auto p-16 rounded-[63px] max-md:mt-10 max-md:px-5 max-md:py-24">
            <div className="text-indigo-900 text-center text-xl font-medium self-center w-full">
              User-Friendly Interface
            </div>
            <div className="text-gray-500 text-center  leading-9 self-stretch mb-0 mt-2 max-md:mb-2.5">
              Our user-friendly interface ensures a seamless experience,
              allowing you to access quizzes and view your scores effortlessly
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Widget;
