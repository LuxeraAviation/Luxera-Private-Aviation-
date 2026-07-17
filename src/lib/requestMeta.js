function getClientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    ""
  );
}

function parseUserAgent(ua = "") {
  if (!ua) return "Unknown device";

  let device = "Desktop";
  if (/\b(tablet|ipad)\b/i.test(ua) || (/android/i.test(ua) && !/mobile/i.test(ua))) {
    device = "Tablet";
  } else if (/\b(mobi|iphone|ipod|android.*mobile|windows phone)\b/i.test(ua)) {
    device = "Mobile";
  }

  const os =
    /windows nt/i.test(ua) ? "Windows"
    : /iphone|ipad|ipod/i.test(ua) ? "iOS"
    : /mac os x/i.test(ua) ? "macOS"
    : /android/i.test(ua) ? "Android"
    : /linux/i.test(ua) ? "Linux"
    : "";

  const browser =
    /edg\//i.test(ua) ? "Edge"
    : /opr\/|opera/i.test(ua) ? "Opera"
    : /chrome|crios/i.test(ua) ? "Chrome"
    : /firefox|fxios/i.test(ua) ? "Firefox"
    : /safari/i.test(ua) ? "Safari"
    : "";

  return [device, [browser, os].filter(Boolean).join(" on ")]
    .filter(Boolean)
    .join(" — ");
}

async function lookupLocation(ip) {
  if (!ip || ip === "::1" || ip === "127.0.0.1" || ip.startsWith("192.168.")) {
    return "Local / private network";
  }
  try {
    const res = await fetch(`https://ipwho.is/${encodeURIComponent(ip)}`, {
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) return "Unknown";
    const data = await res.json();
    if (!data || data.success === false) return "Unknown";
    return (
      [data.city, data.region, data.country].filter(Boolean).join(", ") ||
      "Unknown"
    );
  } catch {
    return "Unknown";
  }
}

export async function collectRequestMeta(request) {
  const ip = getClientIp(request);
  const device = parseUserAgent(request.headers.get("user-agent") || "");
  const location = await lookupLocation(ip);
  return { ip: ip || "Unknown", device, location };
}
