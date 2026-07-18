import { getTransporter } from "@/lib/mail";
import { collectRequestMeta } from "@/lib/requestMeta";
import { notificationEmail, confirmationEmail } from "@/lib/emailTemplates";

const QUOTE_TO = process.env.QUOTE_TO || "charter@luxeraaviation.com";
const QUOTE_FROM = process.env.QUOTE_FROM || "charter@luxeraaviation.com";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const {
    name = "",
    email = "",
    phone = "",
    urgent = false,
    tripType = "",
    from = "",
    to = "",
    departure = "",
    return: returnDate = "",
    passengers = "",
    additionalInfo = "",
    legs = null,
  } = body || {};

  if (!email.trim()) {
    return Response.json({ error: "Email is required" }, { status: 400 });
  }

  const meta = await collectRequestMeta(request);

  const fields = [
    ["Trip type", tripType],
    ["Name", name],
    ["Email", email],
    ["Phone", phone],
    ["Urgent", urgent ? "Yes — client needs to fly urgently" : ""],
  ];

  const legsHavePax = Array.isArray(legs) && legs.some((l) => l.pax);

  if (Array.isArray(legs) && legs.length) {
    legs.forEach((leg, i) => {
      const route = [leg.from, leg.to].filter(Boolean).join(" → ");
      const parts = [route, leg.departure];
      if (leg.pax) parts.push(`${leg.pax} pax`);
      const value = parts.filter(Boolean).join("  ·  ");
      fields.push([`Flight ${i + 1}`, value]);
    });
  } else {
    fields.push(["From", from], ["To", to], ["Departure", departure]);
    if (returnDate) fields.push(["Return", returnDate]);
  }

  if (!legsHavePax) fields.push(["Passengers", passengers]);
  fields.push(["Additional information", additionalInfo]);

  const notification = notificationEmail({
    heading: urgent ? "New Quote Request — URGENT" : "New Quote Request",
    fields,
    meta,
  });
  const confirmation = confirmationEmail({
    name,
    intro:
      "Thank you for your quotation request with Luxera Aviation. We have successfully received the details of your journey.",
  });

  try {
    const transporter = getTransporter();
    const from_ = QUOTE_FROM;

    await transporter.sendMail({
      from: from_,
      to: QUOTE_TO,
      replyTo: email,
      subject: urgent
        ? "URGENT Quote Request — Luxera Aviation"
        : "New Quote Request — Luxera Aviation",
      html: notification.html,
      text: notification.text,
    });

    await transporter.sendMail({
      from: from_,
      to: email,
      subject: "We have received your quote request — Luxera Aviation",
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
