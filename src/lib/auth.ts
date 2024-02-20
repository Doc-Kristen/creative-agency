import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import bcrypt from "bcrypt";
import { connectToDb } from "./utils";
import { User } from "./models";
import { authConfig } from "./auth.config";
import { ICredentials } from "@/types/utils.type";
import { PROVIDERS } from "./helpers/const";

const login = async (credentials: Partial<ICredentials>) => {
  try {
    connectToDb();
    const user = await User.findOne({ email: credentials.email });

    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordCorrect = await bcrypt.compare(
      credentials.password as string,
      user.password
    );

    if (!isPasswordCorrect) {
      throw new Error("Password or login incorrect");
    }
    return user;
  } catch (error) {
    throw new Error("Failed to login");
  }
};
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider && PROVIDERS.includes(account.provider)) {
        connectToDb();
        try {
          const user = await User.findOne({ email: profile?.email });
          const avatarUrl = profile?.avatar_url || profile?.picture || null;

          if (!user) {
            const newUser = new User({
              username: profile?.name,
              email: profile?.email,
              img: avatarUrl,
            });

            await newUser.save();
          }
        } catch (err) {
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        const userMongoData = await User.findOne({ email: user?.email });
        token.id = userMongoData?.id;
        token.isAdmin = userMongoData?.isAdmin;
      }
      return token;
    },
    ...authConfig.callbacks,
  },
});
