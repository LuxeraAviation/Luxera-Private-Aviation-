import { getTransporter, mailFrom } from "@/lib/mail";
import { collectRequestMeta } from "@/lib/requestMeta";
import { notificationEmail, confirmationEmail } from "@/lib/emailTemplates";

const CONTACT_TO = process.env.CONTACT_TO || "info@luxeraaviation.com";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const {
    name = "",
    surname = "",
    email = "",
    number = "",
    message = "",
    subject = "New Contact Enquiry",
  } = body || {};

  if (!email.trim() || !name.trim()) {
    return Response.json(
      { error: "Name and email are required" },
      { status: 400 },
    );
  }

  const fullName = `${name} ${surname}`.trim();
  const meta = await collectRequestMeta(request);

  const fields = [
    ["Name", fullName],
    ["Email", email],
    ["Contact number", number],
    ["Message", message],
  ];

  const notification = notificationEmail({
    heading: subject,
    fields,
    meta,
  });
  const confirmation = confirmationEmail({
    name: fullName,
    intro:
      "Thank you for getting in touch with Luxera Aviation. We have received your enquiry and a member of our team will be in touch shortly.",
  });

  try {
    const transporter = getTransporter();
    const from_ = mailFrom();

    await transporter.sendMail({
      from: from_,
      to: CONTACT_TO,
      replyTo: email,
      subject: `${subject} — Luxera Aviation`,
      html: notification.html,
      text: notification.text,
    });

    await transporter.sendMail({
      from: from_,
      to: email,
      subject: "We have received your enquiry — Luxera Aviation",
      html: confirmation.html,
      text: confirmation.text,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[contact email failed]", err);
    return Response.json(
      { error: "Could not send your enquiry. Please try again." },
      { status: 500 },
    );
  }
}
