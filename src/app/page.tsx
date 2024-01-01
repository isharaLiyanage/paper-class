import Featured from "@/components/home/Featured";
import MostPopular from "@/components/home/MostPopular";
import RecentPost from "@/components/home/RecentPost";
import Widget from "@/components/home/Widget";

export default function Home({
  searchParams,
}: {
  searchParams: { page?: number };
}) {
  const pageNumber = searchParams.page || 1;

  return (
    <div className="">
      <div className=" bg-gradient-to-r  from-white to-[#21c8f64f]  m-auto dark:text-white text-gray-900">
        <Featured />
      </div>
      <div className="">
        <Widget />
      </div>
      <div className=" md:mx-auto max-w-[1200px] flex flex-wrap">
        <div className="w-full md:w-9/12">
          <div className="my-4">
            <b>Recent Posts</b>
          </div>
          <RecentPost page={pageNumber} />
        </div>
        <div className="flex flex-col sm:flex-row md:flex-col w-11/12 md:w-3/12">
          <div className=" border border-blue-100 px-1 rounded">
            <div className="my-4">
              <b>Most Popular</b>
            </div>

            <MostPopular />
            <MostPopular />
            <MostPopular />
          </div>
          <div className=""></div>
        </div>
      </div>
    </div>
  );
}
