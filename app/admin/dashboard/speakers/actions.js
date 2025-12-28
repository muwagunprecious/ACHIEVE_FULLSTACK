"use strict";
"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";

export async function addSpeaker(formData) {
    const name = formData.get("name");
    const title = formData.get("title");
    const bio = formData.get("bio");
    const topic = formData.get("topic");
    const linkedin = formData.get("linkedin");
    const twitter = formData.get("twitter");
    const imageFile = formData.get("image");

    let imagePath = "";

    try {
        if (imageFile && imageFile.size > 0) {
            const fileName = `${Date.now()}-${imageFile.name}`;
            const uploadDir = path.join(process.cwd(), "public", "uploads", "speakers");

            // Ensure directory exists
            await fs.mkdir(uploadDir, { recursive: true });

            const filePath = path.join(uploadDir, fileName);
            const buffer = Buffer.from(await imageFile.arrayBuffer());
            await fs.writeFile(filePath, buffer);

            imagePath = `/uploads/speakers/${fileName}`;
        }

        // Workaround for Prisma Client generate failure: use Raw SQL
        await prisma.$executeRawUnsafe(
            `INSERT INTO "Speaker" (id, name, title, bio, topic, image, twitter, linkedin, "createdAt", "updatedAt") 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())`,
            Math.random().toString(36).substring(2),
            name,
            title,
            bio,
            topic,
            imagePath,
            twitter,
            linkedin
        );

        // Record activity using Raw SQL
        await prisma.$executeRawUnsafe(
            `INSERT INTO "Activity" (id, title, description, type, "createdAt") 
             VALUES ($1, $2, $3, $4, NOW())`,
            Math.random().toString(36).substring(2),
            "Speaker Added",
            `${name} has been added as a speaker.`,
            "success"
        );

        revalidatePath("/admin/dashboard/speakers");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Failed to add speaker (Raw SQL):", error);
        return { success: false, error: "Failed to add speaker" };
    }
}

export async function deleteSpeaker(id) {
    try {
        // Fetch speaker info using raw query
        const speakers = await prisma.$queryRawUnsafe(
            `SELECT name, image FROM "Speaker" WHERE id = $1`,
            id
        );
        const speaker = speakers[0];

        // Optional: Delete the image file if it exists
        if (speaker?.image) {
            const fullImagePath = path.join(process.cwd(), "public", speaker.image);
            try {
                await fs.unlink(fullImagePath);
            } catch (err) {
                console.error("Failed to delete image file:", err);
            }
        }

        // Delete using Raw SQL
        await prisma.$executeRawUnsafe(
            `DELETE FROM "Speaker" WHERE id = $1`,
            id
        );

        // Record activity
        await prisma.$executeRawUnsafe(
            `INSERT INTO "Activity" (id, title, description, type, "createdAt") 
             VALUES ($1, $2, $3, $4, NOW())`,
            Math.random().toString(36).substring(2),
            "Speaker Removed",
            `${speaker?.name || 'A speaker'} has been removed.`,
            "warning"
        );

        revalidatePath("/admin/dashboard/speakers");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete speaker (Raw SQL):", error);
        return { success: false, error: "Failed to delete speaker" };
    }
}
