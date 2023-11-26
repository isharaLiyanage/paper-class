import Image from "next/image";
import img from "../../../public/hero.webp";
function Featured() {
  return (
    <div className=" overflow-x-hidden ">
      <div className="flex pt-3  flex-col md:flex-row justify-between w-full md:w-8/12 m-auto">
        <div className="flex self-center flex-col md:w-8/12 ">
          <h1 className=" font-bold text-[45px] text-center md:text-left">
            Empowering Students for{" "}
            <span className=" text-[#14A1F0]"> Success</span>
          </h1>
          <p className=" text-gray-600 dark:text-gray-200 text-center md:text-left">
            Mastering MCQs with Paper Class – Your Path to Academic Excellence
          </p>
        </div>
        <div className="relative min-h-[400px] w-full md:w-5/12 ">
          <div className=" top-12 left-2/3 md:top-1  md:-left-2/4 backdrop-blur-[10px] absolute  text-left z-10 bg-white bg-opacity-60 md:bg-opacity-80  pl-20 pr-5 py-2 rounded-[32px] max-md:pl-5">
            <div className="text-zinc-600 text-xl font-semibold leading-10 tracking-wide whitespace-nowrap  self-end">
              400k
            </div>
            <div className="text-gray-600   tracking-wide whitespace-nowrap  self-end">
              Assisted Student
            </div>
          </div>
          <div className=" top-9 md:top-3/4 md:-left-3/4 backdrop-blur-[10px] absolute  z-10 bg-white bg-opacity-60 md:bg-opacity-80 flex flex-col pl-20 pr-6 py-2 rounded-[32px] max-md:px-5">
            <div className="text-zinc-600 text-xl  font-semibold leading-10 tracking-wide ">
              120+ papers{" "}
            </div>
            <div className="text-gray-600  tracking-wide ">1250 + MCQs </div>
          </div>
          <div className=" top-3/4 md:top-2/4 md:left-2/4 md:w-full backdrop-blur-[10px] absolute z-10 bg-white bg-opacity-60 md:bg-opacity-80 flex flex-col pl-20 pr-6 py-2 rounded-[32px] max-md:px-5">
            <div className="text-zinc-600 text-xl font-semibold leading-10 tracking-wide ">
              4+ subjects
            </div>
            <div className="text-gray-600   ">12+ Sub-Subjects</div>
          </div>
          <div className=" ">
            <Image
              alt="hero section image"
              className=" z-0"
              src={img}
              fill
              objectFit=" contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Featured;
