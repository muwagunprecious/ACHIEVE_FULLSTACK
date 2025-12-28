"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function castVote(nomineeId, categoryId, email) {
    if (!email) {
        return { success: false, error: "Email is required." };
    }

    try {
        // Check if email already voted for this category
        const existingVote = await prisma.vote.findFirst({
            where: {
                voterEmail: email,
                categoryId: categoryId
            }
        });

        if (existingVote) {
            return { success: false, error: "You have already voted in this category." };
        }

        // Create vote
        await prisma.vote.create({
            data: {
                nomineeId,
                categoryId,
                voterEmail: email
            }
        });

        // Increment nominee votes count
        await prisma.nominee.update({
            where: { id: nomineeId },
            data: { votesCount: { increment: 1 } }
        });

        // Revalidate admin dashboard where votes are shown
        revalidatePath('/admin/dashboard');
        revalidatePath('/vote');

        return { success: true };

    } catch (error) {
        console.error("Failed to cast vote:", error);
        return { success: false, error: "Failed to cast vote. Please try again." };
    }
}
