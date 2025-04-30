import { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { isUserIdAdmin } from "./admin";

export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session && session.user && token.sub) {
        session.user.id = token.sub;
        session.user.isAdmin = await isUserIdAdmin(token.sub);
      }
      return session;
    },
    async jwt({ token }) {
      // You could also add isAdmin into JWT token here if you want, but session callback is enough
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
