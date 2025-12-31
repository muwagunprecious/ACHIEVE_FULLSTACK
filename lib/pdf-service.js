import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import QRCode from 'qrcode';

export async function generateTicketPDF({ fullName, ticketType, ticketPrice, ticketId }) {
    console.log(`[PDF-SERVICE] Generating PDF using pdf-lib for ${fullName} (${ticketId})`);

    try {
        // Create a new PDFDocument
        const pdfDoc = await PDFDocument.create();

        // Add a page (A6 roughly is 298 x 420 points)
        const page = pdfDoc.addPage([297, 420]);
        const { width, height } = page.getSize();

        // Standard Fonts
        const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        const helveticaBoldOblique = await pdfDoc.embedFont(StandardFonts.HelveticaBoldOblique);
        const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);

        // --- Background ---
        page.drawRectangle({
            x: 0,
            y: 0,
            width,
            height,
            color: rgb(0.1, 0.1, 0.1), // #1a1a1a
        });

        // Accent Bar
        page.drawRectangle({
            x: 0,
            y: height - 10,
            width,
            height: 10,
            color: rgb(1, 0.55, 0), // #ff8c00
        });

        // --- Brand Header ---
        page.drawText('ACHIEVERS SUMMIT', {
            x: 20,
            y: height - 45,
            size: 18,
            font: helveticaBold,
            color: rgb(1, 1, 1),
        });

        page.drawText('2026', {
            x: 220,
            y: height - 45,
            size: 18,
            font: helveticaBoldOblique,
            color: rgb(1, 0.55, 0),
        });

        // --- Content ---
        page.drawText('OFFICIAL EVENT TICKET', {
            x: 20,
            y: height - 75,
            size: 10,
            font: helvetica,
            color: rgb(1, 1, 1),
        });

        // Horizontal Line
        page.drawRectangle({
            x: 20,
            y: height - 85,
            width: width - 40,
            height: 1,
            color: rgb(1, 1, 1),
        });

        // Attendee Info
        page.drawText('ATTENDEE', { x: 20, y: height - 110, size: 8, font: helvetica, color: rgb(1, 0.55, 0) });
        page.drawText(fullName.toUpperCase(), { x: 20, y: height - 130, size: 16, font: helveticaBold, color: rgb(1, 1, 1) });

        page.drawText('CATEGORY', { x: 20, y: height - 160, size: 8, font: helvetica, color: rgb(1, 0.55, 0) });
        page.drawText(ticketType.toUpperCase(), { x: 20, y: height - 180, size: 14, font: helveticaBold, color: rgb(1, 1, 1) });

        page.drawText('PRICE / STATUS', { x: 20, y: height - 210, size: 8, font: helvetica, color: rgb(1, 0.55, 0) });
        page.drawText(ticketPrice ? ticketPrice.toUpperCase() : 'COMPLIMENTARY', { x: 20, y: height - 230, size: 12, font: helveticaBold, color: rgb(1, 1, 1) });

        page.drawText('TICKET ID', { x: 180, y: height - 260, size: 8, font: helvetica, color: rgb(1, 0.55, 0) });
        page.drawText(ticketId, { x: 180, y: height - 275, size: 10, font: helveticaBold, color: rgb(1, 1, 1) });

        // --- QR Code ---
        const qrData = JSON.stringify({
            id: ticketId,
            name: fullName,
            category: ticketType,
            event: 'Achievers Summit 2026'
        });

        const qrCodeDataURL = await QRCode.toDataURL(qrData, {
            margin: 1,
            color: {
                dark: '#ffffff',
                light: '#1a1a1a'
            }
        });

        const qrImageBytes = Buffer.from(qrCodeDataURL.split(',')[1], 'base64');
        const qrImage = await pdfDoc.embedPng(qrImageBytes);

        page.drawImage(qrImage, {
            x: 20,
            y: height - 380,
            width: 90,
            height: 90,
        });

        // --- Footer ---
        page.drawRectangle({
            x: 0,
            y: 0,
            width,
            height: 60,
            color: rgb(0.05, 0.05, 0.05),
        });

        page.drawText('VENUE', { x: 20, y: 35, size: 8, font: helvetica, color: rgb(0.4, 0.4, 0.4) });
        page.drawText('Victoria Island, Lagos', { x: 20, y: 20, size: 10, font: helvetica, color: rgb(1, 1, 1) });

        page.drawText('DATE', { x: 180, y: 35, size: 8, font: helvetica, color: rgb(0.4, 0.4, 0.4) });
        page.drawText('31 March - 01 April', { x: 180, y: 20, size: 10, font: helvetica, color: rgb(1, 1, 1) });

        // Serialize the PDFDocument to bytes (a Uint8Array)
        const pdfBytes = await pdfDoc.save();

        return Buffer.from(pdfBytes);
    } catch (error) {
        console.error('[PDF-SERVICE] Error generating PDF with pdf-lib:', error);
        throw error;
    }
}
