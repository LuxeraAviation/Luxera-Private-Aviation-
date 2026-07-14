import { getTransporter, mailFrom } from "@/lib/mail";
import { collectRequestMeta } from "@/lib/requestMeta";
import { notificationEmail, confirmationEmail } from "@/lib/emailTemplates";

const QUOTE_TO = process.env.QUOTE_TO || "charter@luxeraaviation.com";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const {
    email = "",
    from = "",
    to = "",
    departure = "",
    return: returnDate = "",
    passengers = "",
    additionalInfo = "",
  } = body || {};

  if (!email.trim()) {
    return Response.json({ error: "Email is required" }, { status: 400 });
  }

  const meta = await collectRequestMeta(request);

  const fields = [
    ["Email", email],
    ["From", from],
    ["To", to],
    ["Departure", departure],
    ["Return", returnDate],
    ["Passengers", passengers],
    ["Additional information", additionalInfo],
  ];

  const notification = notificationEmail({
    heading: "New Quote Request",
    fields,
    meta,
  });
  const confirmation = confirmationEmail({
    name: "",
    intro:
      "Thank you for your quotation request with Luxera Aviation. We've successfully received the details of your journey.",
  });

  try {
    const transporter = getTransporter();
    const from_ = mailFrom();

    await transporter.sendMail({
      from: from_,
      to: QUOTE_TO,
      replyTo: email,
      subject: "New Quote Request — Luxera Aviation",
      html: notification.html,
      text: notification.text,
    });

    await transporter.sendMail({
      from: from_,
      to: email,
      subject: "We've received your quote request — Luxera Aviation",
      html: confirmation.html,
      text: confirmation.text,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[quote email failed]", err);
    return Response.json(
      { error: "Could not send your request. Please try again." },
      { status: 500 },
    );
  }
}
