import Image from "next/image";
import React from "react";
import girl from "../../../public/girl.jpg";
import { error } from "console";
import { Key } from "readline";

type cat = {
  id: string;
  slug: string;
  title: string;
  img: string;
};
const getData = async () => {
  const res = await fetch(process.env.webUrl + "/api/categories", {
    cache: "default",
  });
  if (!res.ok) {
    throw error("backend not working");
  }
  return res.json();
};
async function PopularCategory() {
  const cat = await getData();
  const colors = ["#ff5733", "#33ff57", "#5733ff", "#ffff33", "#33ffff"];
  return (
    <div>
      <h5 className=" my-3">Popular Category</h5>
      <div className=" flex flex-wrap  justify-around gap-2 ">
        {cat?.categories.map((item: cat, index: any) => (
          <div
            key={item.id}
            style={{ backgroundColor: colors[index % colors.length] }}
            className=" capitalize rounded-md flex  self-center py-3 px-4  justify-between"
          >
            <div className=" relative w-6 h-6">
              <Image
                src={girl}
                fill
                style={{ borderRadius: "50%" }}
                alt=""
                objectFit="cover"
              />
            </div>

            <a href="#" className=" ">
              {item.slug}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
export default PopularCategory;
