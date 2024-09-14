import prisma from "@/db/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import Email from "next-auth/providers/email";


type User = any;
export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "email", type: "text", placeholder: "samyakhorny@horny.com", required: true },
                password: { label: "Password", type: "password", required: true }
            },
            async authorize(credentials: any, req): Promise<User | null> {
                const hashedPassword = await bcrypt.hash(credentials.password, 10);
                const existingUser = await prisma.user.findFirst({
                    where: {
                        email: credentials.email
                    }
                });

                if (existingUser) {
                    const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                    if (passwordValidation) {
                        return {
                            id: existingUser.id.toString(),
                            Email: existingUser.email
                        }
                    }

                    return null;
                }

                try {
                    const user = await prisma.user.create({
                        data: {
                            email: credentials.email,
                            password: hashedPassword
                        }
                    });

                    return {
                        msg: "user created",
                        id: user.id.toString
                    }
                }catch(e){
                    console.log(e)
                }

                return null;
      
       }

        })
    ],

    secret: "secret",
    callbacks: {
        async session({token , session}: any){
            session.user.id = token.sub

            return session;
        }
    }
}