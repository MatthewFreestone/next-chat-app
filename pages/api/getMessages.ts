// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();
  const allMessages = await prisma.message.findMany();
  console.log(`Got all ${allMessages.length} messages`);
  res.status(200).send(allMessages);
  prisma.$disconnect();
}
