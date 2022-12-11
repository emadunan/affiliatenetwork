declare module "@prisma/client/scalar" {

  import { Prisma } from '@prisma/client';


  // 1: Define a type that includes Chapters relation to `Book`
  const userWithMeta = Prisma.validator<Prisma.UserArgs>()({
    include: {
      userMeta: true
    },
  });
  export type UserWithMeta = Prisma.UserGetPayload<typeof userWithMeta>;

}