import { error } from "console";
import Image from "next/image";
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
  console.log(data);

  return (
    <section>
      {data ? (
        <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
          <div className="text-center">
            <div className=" relative w-16 h-16 rounded m-auto">
              <Image
                src={user.image}
                alt={`${user.name}'s profile`}
                objectFit="cover"
                fill
                className="w-32 h-32 mx-auto rounded-full"
              />
            </div>
            <h2 className="text-xl font-semibold mt-4">{user.name}</h2>
            <p className="text-gray-500">{`ID: ${user.id}`}</p>
            <p className="text-gray-500">{`Email: ${user.email}`}</p>
          </div>
        </div>
      ) : (
        "Loading..."
      )}
    </section>
  );
}

export default page;
