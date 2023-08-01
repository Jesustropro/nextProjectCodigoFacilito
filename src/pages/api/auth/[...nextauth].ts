import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import NextAuth, { NextAuthOptions } from "next-auth";
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          type: "text",
          label: "Email",
        },
        password: {
          type: "password",
          label: "Password",
        },
      },
      async authorize(credentials) {
        const result = await fetch(
          `${process.env.NEXTAUTH_URL}/api/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          }
        );
        const response = await result.json();
        if (result.status === 200 && response.user) {
          return response.user;
        } else {
          console.error("error");
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/auth/login",
    signOut: "/",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }: any) {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      return { ...token, ...user };
    },
    async session({ session, token }: any) {
      session.user = token;
      return session;
    },
    async signIn({ user, account }: any) {
      if (account.provider === "credentials") {
        return true;
      }
      if (account.provider === "google") {
        const { name, email } = user;
        try {
          const result = await fetch(
            `${process.env.NEXTAUTH_URL}/api/auth/google`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name, email }),
            }
          );
          const response = await result.json();
          if (result.status === 200 && response.usermdb) {
            //replace all content of user, with content of response.usermdb[0]
            user.name = response.usermdb[0].name;
            user.url = response.usermdb[0].url;
            user._id = response.usermdb[0]._id;
            user.likes = response.usermdb[0].likes;
            user.lastName = response.usermdb[0].lastName;

            return true;
          } else if (result.status === 200 && response.usernewmdb) {
            user.name = response.usernewmdb[0].name;

            user._id = response.usernewmdb[0]._id;
            user.likes = response.usernewmdb[0].likes;
            user.lastName = response.usernewmdb[0].lastName;
            return true;
          } else {
            console.error("error en el status");
            return false;
          }
        } catch {
          console.log("error");
          return false;
        }
      } else {
        return false;
      }
    },
  },
};
export default NextAuth(authOptions);
