// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = JSON.parse(req.body);
  await insertMessage(data.content, data.user)
  res.status(200).send(data);
}

export const insertMessage = async (content: string, user: string) => {
  await prisma.$connect()
  const newMessage = await prisma.message.create({
    data: {
      content: content,
      user: user
    }
  });
  console.log(
    `Added new message: "${newMessage.content}" from "${newMessage.user}"`
  );
  await prisma.$disconnect();
}