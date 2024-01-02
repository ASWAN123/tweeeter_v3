import { db } from "@/app/lib/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import  { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const checkUserExist = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (!checkUserExist) {
          return null;
        }

        let checkPassword = await compare(
          credentials.password,
          checkUserExist.password
        );

        if (!checkPassword) {
          return null;
        }

        return {
          id: `${checkUserExist.id}`,
          username: checkUserExist.username,
          email: checkUserExist.email,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      session.user = token;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST , authOptions  };