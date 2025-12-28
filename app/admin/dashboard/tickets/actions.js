"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function toggleTicketCategoryStatus(formData) {
    const id = formData.get("id");
    const currentState = formData.get("currentState") === "true";

    try {
        await prisma.ticketCategory.update({
            where: { id },
            data: {
                isEnabled: !currentState,
                status: !currentState ? 'ACTIVE' : 'CLOSED' // Sync status with enabled state for now
            }
        });
        revalidatePath("/admin/dashboard/tickets");
    } catch (error) {
        console.error("Failed to toggle ticket category:", error);
    }
}
export async function updateTicketCategory(formData) {
    const id = formData.get("id");
    const name = formData.get("name");
    const price = parseFloat(formData.get("price"));
    const capacity = parseInt(formData.get("capacity"));
    const status = formData.get("status");
    const features = formData.getAll("features").filter(f => f.trim() !== "");

    try {
        await prisma.ticketCategory.update({
            where: { id },
            data: {
                name,
                price,
                capacity,
                status,
                features,
                isEnabled: status === 'ACTIVE'
            }
        });
        revalidatePath("/admin/dashboard/tickets");
        return { success: true };
    } catch (error) {
        console.error("Failed to update ticket category:", error);
        return { success: false, error: "Failed to update ticket category" };
    }
}

export async function addTicketCategory(formData) {
    const name = formData.get("name");
    const price = parseFloat(formData.get("price"));
    const capacity = parseInt(formData.get("capacity"));
    const description = formData.get("description") || "";
    const features = formData.getAll("features").filter(f => f.trim() !== "");

    try {
        await prisma.ticketCategory.create({
            data: {
                id: Math.random().toString(36).substring(2, 10), // Simple ID for now if not using cuid
                name,
                price,
                capacity,
                description,
                features,
                status: 'ACTIVE',
                isEnabled: true,
                updatedAt: new Date()
            }
        });
        revalidatePath("/admin/dashboard/tickets");
        return { success: true };
    } catch (error) {
        console.error("Failed to add ticket category:", error);
        return { success: false, error: "Failed to add ticket category" };
    }
}

export async function deleteTicketCategory(id) {
    try {
        // Check if there are tickets sold for this category
        const soldCount = await prisma.ticket.count({
            where: { ticketCategoryId: id }
        });

        if (soldCount > 0) {
            return { success: false, error: "Cannot delete category with sold tickets. Close it instead." };
        }

        await prisma.ticketCategory.delete({
            where: { id }
        });
        revalidatePath("/admin/dashboard/tickets");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete ticket category:", error);
        return { success: false, error: "Failed to delete ticket category" };
    }
}
