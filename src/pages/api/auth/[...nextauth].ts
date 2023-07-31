import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

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
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: "/auth/login",
    signOut: "/",
  },
  callbacks: {
    async signIn({ user, account }: any) {
      //conect  to mongodb
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

            console.log(user, "user");

            return true;
          } else {
            console.error("error en el status");
          }
        } catch {
          console.log("error");
        }
      }
    },
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
