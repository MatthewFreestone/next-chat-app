// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();
  const data = JSON.parse(req.body);
  const newMessage = await prisma.message.create({
    data,
  });
  console.log(`Added new message: "${newMessage.content}" from "${newMessage.user}"`);
  res.status(200).send(data);
  prisma.$disconnect()
}
