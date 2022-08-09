// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await deleteAllMessages()
  res.status(200).send("Success");
}
export const deleteAllMessages = async () => {
  await prisma.$connect()
  const { count } = await prisma.message.deleteMany();
  console.log(`Deleted ${count} Messages.`);
  await prisma.$disconnect();
}
