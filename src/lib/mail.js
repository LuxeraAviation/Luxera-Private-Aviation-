import nodemailer from "nodemailer";

let cachedTransporter = null;

export function getTransporter() {
  if (cachedTransporter) return cachedTransporter;

  const host = process.env.ZOHO_SMTP_HOST || "smtp.zoho.com";
  const port = Number(process.env.ZOHO_SMTP_PORT || 465);
  const user = process.env.ZOHO_SMTP_USER;
  const pass = process.env.ZOHO_SMTP_PASS;

  if (!user || !pass) {
    throw new Error(
      "Missing SMTP credentials: set ZOHO_SMTP_USER and ZOHO_SMTP_PASS in .env.local",
    );
  }

  cachedTransporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  return cachedTransporter;
}

export function mailFrom() {
  return (
    process.env.MAIL_FROM ||
    process.env.ZOHO_SMTP_USER ||
    "info@luxeraaviation.com"
  );
}
