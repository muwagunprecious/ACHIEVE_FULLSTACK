import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

async function authHandler(req, context) {
    if (context.params) {
        await context.params;
    }
    return handler(req, context);
}

export { authHandler as GET, authHandler as POST };
