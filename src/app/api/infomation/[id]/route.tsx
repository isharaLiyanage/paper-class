import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../utils/connect";

export const GET = async (req: NextRequest, { params }: any) => {
  const { id } = await params;

  try {
    const marks = await prisma.user.findFirst({
      where: { email: id },
      include: { marks: true },
    });
    const papers = await prisma.paper.findMany();

    const questionsPerPaper = papers.map((paper) => ({
      id: paper.id,
      title: paper.title,
      numberOfQuestions: paper.questions.length,
    }));

    return new NextResponse(
      JSON.stringify({ marks, questionsPerPaper, status: 200 })
    );
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ massage: "Something Wrong...", status: 500 })
    );
  }
};
