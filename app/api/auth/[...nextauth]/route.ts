import { isUserIdAdmin } from "@/lib/auth/admin"; // Your existing server util!
import NextAuth, { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

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
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
