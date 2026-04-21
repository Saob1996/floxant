import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export interface MailAttachment {
  filename: string;
  content: string | Buffer;
}

export interface SendDocumentMailParams {
  to: string;
  subject: string;
  customerName: string;
  documentNumber: string;
  documentType: string;
  previewLink?: string;
}

/**
 * Sends a professional document notification via Resend.
 * Falls back to console log if no API key is provided.
 */
export async function sendDocumentMail(params: SendDocumentMailParams) {
  const { to, subject, customerName, documentNumber, documentType, previewLink } = params;

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <h1 style="color: #111; font-size: 24px;">FLOXANT Dokument</h1>
      <p>Sehr geehrte(r) ${customerName},</p>
      <p>hier erhalten Sie Ihr(e) <strong>${documentType}</strong> mit der Nummer <strong>${documentNumber}</strong> zu Ihrem Vorgang bei FLOXANT.</p>
      
      <div style="margin: 30px 0; text-align: center;">
         <a href="${previewLink || '#'}" style="background-color: #00e5ff; color: #000; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">Dokument Online ansehen</a>
      </div>

      <p style="font-size: 14px; color: #666;">
        Sollten Sie Fragen haben, antworten Sie einfach auf diese E-Mail oder rufen Sie uns an.
      </p>
      <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
      <p style="font-size: 12px; color: #999;">
        FLOXANT - Johanna-Kinkel-Straße 1 + 2, 93049 Regensburg<br/>
        Tel: +49 1577 1105087 | info@floxant.de
      </p>
    </div>
  `;

  if (!resend) {
    console.warn(`[DRY RUN] No RESEND_API_KEY found. Email to ${to} would contain:`, {
      subject,
      documentNumber,
      documentType
    });
    return { success: false, error: "CREDENTIALS_MISSING", dryRun: true };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'FLOXANT <info@floxant.de>',
      to: [to],
      subject: subject,
      html: html,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, id: data?.id };
  } catch (err: any) {
    console.error("Mail Send Exception:", err);
    return { success: false, error: err.message };
  }
}
