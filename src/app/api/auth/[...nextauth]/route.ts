import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import NextAuth, { getServerSession } from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import { Prisma, PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

const AuthOption: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: "dsd",
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        // Define your credential fields here
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const user = await prisma.user.findFirst({
            where: { ...(credentials && { email: credentials.email }) },
          });

          if (user) {
            if (user.password !== null && credentials) {
              const isPassword = await bcrypt.compare(
                credentials.password,
                user.password
              );
              if (isPassword) {
                return user;
              } else {
                throw new Error("Wrong password");
              }
            } else {
              throw new Error("Missing credentials");
            }
          } else {
            throw new Error("User Not Found");
          }
        } catch (error: any) {
          const { statusCode, message } = error;
          console.error(message + "sds");
          throw new Error(message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          username: token.name,
        },
      };
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
};

const handler = NextAuth(AuthOption);

export { handler as GET, handler as POST };
export const getAuthSession = () => getServerSession(AuthOption);
