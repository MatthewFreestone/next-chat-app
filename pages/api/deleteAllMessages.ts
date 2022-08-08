// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();
  const {count} = await prisma.message.deleteMany()
  console.log(`Deleted ${count} Messages.`);
  res.status(200).send("Success")
  prisma.$disconnect()
}
