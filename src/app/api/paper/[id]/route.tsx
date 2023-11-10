import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../utils/connect";

export const GET = async (req: NextRequest, { params }: any) => {
  const { id } = await params;
  console.log(params);
  try {
    const paper = await prisma.question.findMany({
      where: { PeparId: id },
      select: {
        id: true,
        quiz: true,
        answers: true,
      },
    });

    return new NextResponse(JSON.stringify({ paper, status: 200 }));
  } catch {
    return new NextResponse(
      JSON.stringify({ massage: "Something Wrong...", status: 500 })
    );
  }
};

// export const Post = async (req: NextRequest, { params }: any) => {
//   const { id } = await params;
//   console.log(id);
//   // try {
//   //   const paper = await prisma.question.findMany({
//   //     where: {},
//   //     select: {
//   //       id: true,
//   //       quiz: true,
//   //       answers: true,
//   //     },
//   //   });

//   //   return new NextResponse(JSON.stringify({ paper, status: 200 }));
//   // } catch(err) {
//   //   return new NextResponse(
//   //     JSON.stringify({ massage: "Something Wrong...", status: 500 ,err })
//   //   );
//   // }
// };
