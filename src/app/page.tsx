import Categories from "@/components/home/Categories";
import Featured from "@/components/home/Featured";
import MostPopular from "@/components/home/MostPopular";
import PopularCategory from "@/components/home/PopularCategory";
import RecentPost from "@/components/home/RecentPost";
import { useSearchParams } from "next/navigation";

export default function Home({ searchParams }: any) {
  const pageNumber = searchParams.page || 1;

  return (
    <div className="mx-1 md:mx-auto max-w-[900px] m-auto dark:text-white text-gray-900">
      <h2 className=" my-3 text-4xl text-center ">
        <b>Hey, here! </b> Discover my stories and creative ideas.
      </h2>
      <Featured />

      <div className="flex flex-wrap">
        <div className="w-full md:w-9/12">
          <div className="my-4">
            <b>Recent Posts</b>
          </div>
          <RecentPost page={pageNumber} />
        </div>
        <div className="flex flex-col sm:flex-row md:flex-col w-11/12 md:w-3/12">
          <div className="">
            <div className="my-4">
              <b>Most Popular</b>
            </div>

            <MostPopular />
            <MostPopular />
            <MostPopular />
          </div>
          <div className="">
            <div className="my-4">
              <b>Categories</b>
            </div>
            {/* <Categories /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
