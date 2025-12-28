import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                console.log("Auth attempt for:", credentials?.email);
                if (!credentials?.email || !credentials?.password) {
                    console.log("Missing credentials");
                    return null;
                }

                const admin = await prisma.admin.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });

                if (!admin) {
                    console.log("Admin not found in DB");
                    return null;
                }

                const isPasswordValid = await bcrypt.compare(
                    credentials.password,
                    admin.password
                );

                if (!isPasswordValid) {
                    console.log("Invalid password for:", credentials.email);
                    return null;
                }

                console.log("Login successful for:", credentials.email);
                return {
                    id: admin.id,
                    email: admin.email,
                    name: admin.name,
                    role: admin.role,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.role = token.role;
                session.user.id = token.id;
            }
            return session;
        },
    },
    pages: {
        signIn: "/admin/login",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};
