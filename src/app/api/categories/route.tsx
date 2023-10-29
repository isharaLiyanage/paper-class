import { NextResponse } from "next/server";
import prisma from "../../../../utils/connect";

export const GET = async () => {
  try {
    const categories = await prisma.paper.findMany({});
    return new NextResponse(JSON.stringify({ categories, status: 200 }));
  } catch {
    return new NextResponse(
      JSON.stringify({ massage: "Something Wrong...", status: 500 })
    );
  }
};
