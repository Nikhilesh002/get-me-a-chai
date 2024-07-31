import connectDb from "@/db/connectDb";
import User from "@/models/User";
import NextAuth from "next-auth";
import AppleProvider from "next-auth/providers/apple";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import TwitterProvider from "next-auth/providers/twitter";

export const authOptions = NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID,
      clientSecret: process.env.APPLE_SECRET
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET
    })
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // console.log(user,"-", account,"-", profile,"-", email,"-", credentials);
      // console.log("user", user);
      if(account.provider==="github"){
        try {
          await connectDb();  // connect to db and save details
          const currentUser= await User.findOne({email:user.email});
          // console.log("currentUser",currentUser);
          if(!currentUser){
            const newUser=new User({
              email:user.email,
              username:user.email.split('@')[0],
              name:user.name,
              profilePic:user.image
            });
            // console.log("newUser",newUser);
            await newUser.save();
          }
        } catch (error) {
          console.log(error);
          return false;
        }
      }
      return true;
    },
    async session({ session, user, token }) {
      // console.log(user,"-", session,"-", token);
      // console.log("session1",session);
      const dbUser=await User.findOne({email:session.user.email});
      // console.log("dbUser1",dbUser);
      session.user=dbUser;
      // console.log("session2",session);
      return session
    },
  }
})

export { authOptions as GET, authOptions as POST };
