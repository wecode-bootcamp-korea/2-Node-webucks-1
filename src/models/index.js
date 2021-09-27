import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

client.$use(async (params, next) => {
  const before = Date.now();

  const result = await next(params);
  const after = Date.now();

  if (after - before > 1000) {
    console.log(`Query ${params.action} took ${after - before}ms`);
  }

  return result;
});

export default client;
