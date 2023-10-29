import { error } from "console";
import React from "react";
const getData: any = async (slug: any) => {
  const res = await fetch(process.env.webUrl + `/api/infomation/${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw error("backend not working");
  }
  return res.json();
};
async function page({ params }: any) {
  console.log(params);
  const data = await getData(params.id);
  const user = data.marks;
  console.log(user);

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
                  className="bg-white mx-52 shadow-lg p-4 rounded-lg"
                >
                  <div className="mb-4">
                    <h1 className="text-2xl font-bold overflow-x-auto">
                      {" "}
                      Paper Name: {paper.title}
                    </h1>
                    <p className="text-gray-500">Paper ID: {paper.paperId}</p>
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
