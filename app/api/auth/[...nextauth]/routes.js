// /app/api/auth/[...nextauth].js

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "jsmith",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Replace this with your own authentication logic
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password,
          }),
        });

        const user = await res.json();

        if (res.ok && user) {
          return user; // Return user object if authentication is successful
        } else {
          return null; // Return null if authentication fails
        }
      },
    }),
  ],
  session: {
    strategy: "jwt", // Use JWT for session management
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET, // Ensure this is set in your environment variables
  },
  pages: {
    signIn: "/auth/signin", // Optional: Customize your sign-in page
  },
});
