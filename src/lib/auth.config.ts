import { NextAuthConfig } from "next-auth";
import { PAGE_ROUTES } from "./helpers/const";

export const authConfig = {
  pages: {
    signIn: PAGE_ROUTES.login,
  },
  providers: [],
  callbacks: {
    // FOR MORE DETAIL ABOUT CALLBACK FUNCTIONS CHECK https://next-auth.js.org/configuration/callbacks
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.isAdmin = token.isAdmin as boolean;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const user = auth?.user;
      const isOnAdminPanel = nextUrl?.pathname.startsWith(PAGE_ROUTES.admin);
      const isOnBlogPage = nextUrl?.pathname.startsWith(PAGE_ROUTES.blog);
      const isOnLoginPage = nextUrl?.pathname.startsWith(PAGE_ROUTES.login);
      const isOnProfilePage = nextUrl?.pathname.startsWith(PAGE_ROUTES.profile);

      // ONLY ADMIN CAN REACH THE ADMIN DASHBOARD

      if (isOnAdminPanel && !user?.isAdmin) {
        return false;
      }

      // ONLY AUTHENTICATED USERS CAN REACH THE BLOG PAGE

      if (isOnBlogPage && !user) {
        return false;
      }

      // ONLY AUTHENTICATED USERS CAN REACH THE PROFILE PAGE

      if (isOnProfilePage && !user) {
        return false;
      }

      // ONLY UNAUTHENTICATED USERS CAN REACH THE LOGIN PAGE

      if (isOnLoginPage && user) {
        return Response.redirect(new URL(PAGE_ROUTES.main, nextUrl));
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
