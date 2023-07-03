import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
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
  },
};
export default NextAuth(authOptions);
