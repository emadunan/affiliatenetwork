import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import db from "../../../lib/prismadb";

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    })
  ],
  debug: true,
  secret: "d6bbcfb356bfcd217331983b911cabe3a8ce70289d330f06e988033cf1430695",
  // callbacks: {
  //   async signIn({ user, account, profile, email, credentials }) {
  //     return true;
  //   },
  //   async redirect({ url, baseUrl }) {
  //     return baseUrl;
  //   },
  //   async session({ session, token, user }) {
  //     session.user.userId = user.id;

  //     const currUser = await db.userMeta.findFirst({
  //       where: { userId: user.id },
  //     });

  //     if (currUser) {
  //       session.user.privilege = currUser.privilege;
  //     }

  //     return session;
  //   },
  // },
};

export default NextAuth(authOptions);
