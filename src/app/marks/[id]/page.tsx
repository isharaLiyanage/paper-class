import React from "react";

type item = {
  id: string;
  title: string;
  numberOfQuestions: number;
};
const getData: any = async (slug: any) => {
  const res = await fetch(process.env.webUrl + `/api/infomation/${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw console.error("backend not working");
  }
  return res.json();
};
async function page({ params }: { params: { id: number } }) {
  const data = await getData(params.id);
  const user = data.marks;
  const questions = data.questionsPerPaper;

  const progress = (title: string) => {
    const paper = questions.find((p: item) => p.title.includes(title));

    if (paper) {
      return paper.numberOfQuestions;
    }
    // return paper.numberOfQuestions;
  };
  console.log(progress);
  const prestige = (questions: number, marks: number) => {
    const prestige = Math.round((marks / questions) * 100);
    if (prestige) {
      return prestige;
    } else {
      return 0;
    }
  };
  return (
    <section>
      {data ? (
        <div className="bg-white shadow-lg p-4 rounded-lg">
          <div className="mb-4">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-500">{user.email}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Papers:</h2>
            <ul className="list-disc pl-6">
              {user.marks.map((paper: any, key: number) => (
                <div
                  key={key}
                  className="bg-white md:mx-52 shadow-lg p-4 rounded-lg"
                >
                  <div className="flex justify-between">
                    <div className="mb-4">
                      <h1 className="text-2xl font-bold overflow-x-auto">
                        {" "}
                        Paper Name: {paper.title}
                      </h1>
                      <p className="text-gray-500 overflow-x-auto scroll-bar">
                        Paper ID: {paper.paperId}
                      </p>
                    </div>

                    <div className="w-64 bg-white p-4 rounded shadow-md">
                      <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                              Progress
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-semibold inline-block text-teal-600">
                              {prestige(progress(paper.title), paper.marks)}
                            </span>
                          </div>
                        </div>
                        <div className="flex mb-2 items-center justify-between">
                          <div className="flex-1">
                            <div className="w-full bg-teal-200 rounded-full">
                              <div
                                style={{
                                  width: `${prestige(
                                    progress(paper.title),
                                    paper.marks
                                  )}%`,
                                }}
                                className={` bg-teal-500 rounded-full text-center py-1 text-xs font-semibold text-white`}
                              >
                                {prestige(progress(paper.title), paper.marks)}%
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2 text-gray-600">Questions:</span>
                    <span className="text-xl font-semibold text-blue-600">
                      {progress(paper.title)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2 text-gray-600">Marks:</span>
                    <span className="text-2xl font-semibold text-blue-600">
                      {paper.marks}
                    </span>
                  </div>
                </div>
              ))}
            </ul>
          </div>
          <div className="flex items-center">
            <span className="mr-2 text-gray-600">Status:</span>
            <span className="text-2xl font-semibold text-blue-600"></span>
          </div>
        </div>
      ) : (
        "Loading..."
      )}
    </section>
  );
}

export default page;
