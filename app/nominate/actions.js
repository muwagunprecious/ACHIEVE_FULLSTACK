"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitNomination(formData) {
    const rawData = {
        nomineeName: formData.get('nomineeName'),
        category: formData.get('category'),
        description: formData.get('reason'),
        nomineeEmail: formData.get('nomineeEmail'),
        nomineePhone: formData.get('nomineePhone'),
        nominatorName: formData.get('nominatorName'),
        nominatorEmail: formData.get('nominatorEmail'),
    };

    try {
        await prisma.nomination.create({
            data: rawData
        });

        // No path to revalidate immediately as it goes to admin, but good practice
        revalidatePath('/admin/dashboard/nominees');
        return { success: true };
    } catch (error) {
        console.error("Failed to submit nomination:", error);
        return { success: false, error: "Failed to submit nomination. Please try again." };
    }
}
