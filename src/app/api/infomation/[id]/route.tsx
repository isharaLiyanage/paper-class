import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../utils/connect";

export const GET = async (req: NextRequest, { params }: any) => {
  const { id } = await params;
  console.log(params);
  try {
    const marks = await prisma.user.findFirst({
      where: { email: id },
      include: { marks: true },
    });
    console.log(marks);
    return new NextResponse(JSON.stringify({ marks, status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ massage: "Something Wrong...", status: 500 })
    );
  }
};
