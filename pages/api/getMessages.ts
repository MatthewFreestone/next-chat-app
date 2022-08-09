// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const messages = await getAllMessages()
  res.status(200).send(messages);
}

export const getAllMessages = async () => {
  await prisma.$connect()
  const allMessages = await prisma.message.findMany();
  console.log(`Got all ${allMessages.length} messages`);
  await prisma.$disconnect();
  return allMessages
}