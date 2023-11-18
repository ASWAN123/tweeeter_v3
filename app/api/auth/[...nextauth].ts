import { db } from "@/prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import NextAuth , { NextAuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
// import jwt from "jsonwebtoken"




export const authOptions : NextAuthOptions  = {
    adapter: PrismaAdapter(db) ,
    session:{
        strategy:'jwt'
    },
    pages:{
        signIn:"/login"
    },
    providers: [

        CredentialsProvider({

          name: "Credentials" ,

          credentials: {
            email: { label: "Email", type: "email", placeholder: "email" } ,
            password: { label: "Password", type: "password" }
          } ,
          async authorize(credentials) {


            if(!credentials?.email || !credentials?.password){
                return null 
            }

            const checkUserExist = await db.user.findUnique({
                where : { email : credentials.email }
            })

            if(!checkUserExist){ 
                return null 
            }

            let checkPassword = await compare(credentials.password , checkUserExist.password )

            if(!checkPassword){ 
                return null  
            } 

            return {
                id : `${checkUserExist.id}` ,
                username: checkUserExist.username ,
                email: checkUserExist.email ,
            }

            
      

          } 
        })
      ],
    //   jwt: {
    //     async encode({ secret, token }) {
    //       return jwt.sign(token, secret)
    //     },
    // },

      callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            return true
          },
          async redirect({ url, baseUrl }) {
            return baseUrl
          },
          async session({ session, user, token }) {
            return session
          },
          async jwt({ token, user, account, profile, isNewUser }) {
            return token
          }
      },

}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }