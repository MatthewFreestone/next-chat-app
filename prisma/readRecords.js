// import { PrismaClient } from '@prisma/client'
const client = require("@prisma/client")
const PrismaClient = client.PrismaClient

const prisma = new PrismaClient()

async function main() {
  const users = await prisma.message.findMany()
  console.log(users)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
