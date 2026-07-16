const BRAND = "#aa8453";
const escapeHtml = (v = "") =>
  String(v)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function rowsHtml(fields) {
  return fields
    .filter(([, value]) => value != null && String(value).trim() !== "")
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:8px 12px;background:#faf7f2;border:1px solid #eee;font-weight:600;white-space:nowrap;vertical-align:top;">${escapeHtml(
            label,
          )}</td>
          <td style="padding:8px 12px;border:1px solid #eee;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");
}

function shell(title, inner) {
  return `<!doctype html><html><body style="margin:0;background:#f4f1ec;font-family:Arial,Helvetica,sans-serif;color:#1b1b1b;">
    <div style="max-width:600px;margin:0 auto;padding:24px;">
      <div style="background:${BRAND};color:#fff;padding:20px 24px;border-radius:6px 6px 0 0;">
        <h1 style="margin:0;font-size:20px;letter-spacing:1px;">LUXERA AVIATION</h1>
      </div>
      <div style="background:#fff;padding:24px;border-radius:0 0 6px 6px;border:1px solid #eee;border-top:none;">
        <h2 style="margin:0 0 16px;font-size:18px;color:#1b1b1b;">${escapeHtml(title)}</h2>
        ${inner}
      </div>
      <p style="text-align:center;color:#999;font-size:12px;margin:16px 0 0;">Luxera Aviation &middot; Private Jet Charter</p>
    </div>
  </body></html>`;
}

export function notificationEmail({ heading, fields, meta }) {
  const inner = `
    <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:20px;">
      ${rowsHtml(fields)}
    </table>
    <h3 style="margin:0 0 8px;font-size:14px;color:#666;text-transform:uppercase;letter-spacing:1px;">Sender details</h3>
    <table style="width:100%;border-collapse:collapse;font-size:13px;color:#555;">
      ${rowsHtml([
        ["IP address", meta.ip],
        ["Device", meta.device],
        ["Location", meta.location],
      ])}
    </table>`;

  const text = [
    heading,
    "",
    ...fields
      .filter(([, v]) => v != null && String(v).trim() !== "")
      .map(([l, v]) => `${l}: ${v}`),
    "",
    "-- Sender details --",
    `IP address: ${meta.ip}`,
    `Device: ${meta.device}`,
    `Location: ${meta.location}`,
  ].join("\n");

  return { html: shell(heading, inner), text };
}

export function confirmationEmail({ name, intro }) {
  const greeting = name ? `Dear ${escapeHtml(name)},` : "Hello,";
  const inner = `
    <p style="margin:0 0 16px;line-height:1.7;">${greeting}</p>
    <p style="margin:0 0 16px;line-height:1.7;">${escapeHtml(intro)}</p>
    <p style="margin:0 0 16px;line-height:1.7;">Our charter desk is reviewing your details and will be in touch shortly, 24/7.</p>
    <p style="margin:24px 0 0;line-height:1.7;">Warm regards,<br/><strong>The Luxera Aviation Team</strong></p>`;

  const text = `${name ? `Dear ${name},` : "Hello,"}\n\n${intro}\n\nOur charter desk is reviewing your details and will be in touch shortly, 24/7.\n\nWarm regards,\nThe Luxera Aviation Team`;

  return { html: shell("We have received your request", inner), text };
}
