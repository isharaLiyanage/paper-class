import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../utils/connect";
import { getAuthSession } from "../auth/[...nextauth]/route";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  console.log(searchParams);
  const Post_per_page = 2;

  const pageSize = searchParams.get("page");
  const category = searchParams.get("cat");

  let page;
  if (pageSize === null) {
    page = 1;
  } else {
    page = parseInt(pageSize);
  }
  const skip = Post_per_page * (page - 1);

  const query = {
    take: Post_per_page,
    skip: skip,
    where: {
      ...(category && { techer: category }),
    },
  };

  try {
    const [posts, count] = await prisma.$transaction([
      prisma.paper.findMany(query),
      prisma.paper.count({ where: query.where }),
    ]);

    return new NextResponse(JSON.stringify({ posts, count, status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ massage: "Something Wrong...", status: 500 })
    );
  }
};

//  create  post
export const POST = async (req: NextRequest, { params }: any) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ massage: "Not Authenticated", status: 401 })
    );
  } else {
    try {
      console.log("first");
      const body = await req.json();

      const getPostID = await prisma.paper.create({
        data: {
          ...body,
          title: body.title,

          techer: session.user?.name,
          questions: [],
        },
      });
      const questionData = body.questions.map((question: any) => ({
        ...question,
        PeparId: getPostID.id,
      }));
      const data = await prisma.question.createMany({
        data: questionData,
      });
      console.log(data);
      const findQuiz = await prisma.question.findMany({
        where: { PeparId: getPostID.id },
      });
      console.log(findQuiz);
      const questionIds = findQuiz.map((quiz) => quiz.id.toString());

      await prisma.paper.update({
        where: { id: getPostID.id },
        data: { questions: questionIds },
      });

      return new NextResponse(JSON.stringify({ status: 200 }));
    } catch (err) {
      console.log(err);
      return new NextResponse(
        JSON.stringify({ massage: "Something Wrong...", status: 500 })
      );
    }
  }
};
