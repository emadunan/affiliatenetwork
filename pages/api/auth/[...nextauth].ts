import NextAuth, { AuthOptions } from "next-auth"
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import db from "../../../lib/prismadb";

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(db),
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM
    })
  ],
  callbacks: {
    async session({ session, token, user }) {
      session.user.userId = user.id;

      const currUser = await db.userMeta.findFirst({ where: { userId: user.id }, });

      if (currUser) {
        session.user.privilege = currUser.privilege;
      }

      return session;
    }
  }
}

export default NextAuth(authOptions)