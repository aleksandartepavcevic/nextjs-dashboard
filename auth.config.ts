import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [],
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isAuth = !!auth?.user;
      const isRootPage = nextUrl.pathname.startsWith("/dashboard");
      const isAuthPage =
        nextUrl.pathname.startsWith("/login") ||
        nextUrl.pathname.startsWith("/register");

      if (isRootPage) {
        if (!isAuth) return Response.redirect(new URL("/login", nextUrl));

        return true;
      }

      if (isAuthPage) {
        if (isAuth) return Response.redirect(new URL("/dashboard", nextUrl));

        return true;
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
