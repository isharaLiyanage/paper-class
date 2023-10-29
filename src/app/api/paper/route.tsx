import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "../auth/[...nextauth]/route";
import prisma from "../../../../utils/connect";

export const POST = async (req: NextRequest) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ massage: "Not Authenticated", status: 401 })
    );
  } else {
    let score = 0;
    const getMarks = (paper: any, studentAnswers: string[]) => {
      for (const question of paper) {
        const studentAnswer = studentAnswers[question.id];
        if (studentAnswer === question.correctAnswer) {
          score++;
        }
      }
      console.log(score);
    };
    try {
      const body = await req.json();
      console.log(body);
      const paper = await prisma.question.findMany({
        where: { PeparId: body.params },
      });
      getMarks(paper, body.answers);
      const TotalScore = score.toString();

      console.log(TotalScore);
      // find user Id
      const findId = await prisma.user.findFirst({
        where: { email: session?.user?.email },
      });
      const userId = findId?.id || "";
      const paperId = await prisma.paper.findFirst({
        where: { id: body.params },
      });

      // find user already has
      const find = await prisma.marks.findMany({
        where: { UserId: userId, paperId: body.params },
      });
      console.log(find);
      const markId = find[0]?.id;
      if (find.length) {
        const mark = await prisma.marks.update({
          where: { id: markId ?? undefined },
          data: {
            marks: TotalScore,
            paperId: body.params,
            title: paperId?.title || "",
            UserId: userId,
          },
        });
        return new NextResponse(JSON.stringify({ mark, status: 200 }));
      } else {
        const mark = await prisma.marks.create({
          data: {
            marks: TotalScore,
            paperId: body.params,
            UserId: userId,
            title: paperId?.title || "",
          },
        });
        return new NextResponse(JSON.stringify({ mark, status: 200 }));
      }
    } catch (err) {
      console.log(err);
      return new NextResponse(
        JSON.stringify({ massage: "Something Wrong...", status: 500 })
      );
    }
  }
};
