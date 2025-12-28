"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function approveNomination(id) {
    try {
        const nomination = await prisma.nomination.findUnique({
            where: { id }
        });

        if (!nomination) throw new Error("Nomination not found");

        // Transaction to update nomination and create nominee
        await prisma.$transaction([
            prisma.nomination.update({
                where: { id },
                data: { status: 'APPROVED' }
            }),
            prisma.nominee.create({
                data: {
                    name: nomination.nomineeName,
                    category: nomination.category,
                    bio: nomination.description, // Initial bio from description
                    nominationId: nomination.id,
                    isVisible: true // Auto-visible or false? Let's say true for now
                }
            })
        ]);

        revalidatePath('/admin/dashboard/nominees');
        return { success: true };
    } catch (error) {
        console.error("Failed to approve nomination:", error);
        return { success: false, error: error.message };
    }
}

export async function rejectNomination(id) {
    try {
        await prisma.nomination.update({
            where: { id },
            data: { status: 'REJECTED' }
        });
        revalidatePath('/admin/dashboard/nominees');
        return { success: true };
    } catch (error) {
        console.error("Failed to reject nomination:", error);
        return { success: false, error: error.message };
    }
}

export async function deleteNomination(id) {
    try {
        await prisma.nomination.delete({
            where: { id }
        });
        revalidatePath('/admin/dashboard/nominees');
        return { success: true };
    } catch (error) {
        console.error("Failed to delete nomination:", error);
        return { success: false, error: error.message };
    }
}
