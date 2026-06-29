/**
 * GET /api/airports?q=london
 *
 * Proxies AviationStack /airports endpoint server-side so the API key
 * is never exposed to the browser.
 *
 * Returns up to 10 matching international airports shaped as:
 *   { iata_code, airport_name, city_name, country_name }
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim();

  if (!q || q.length < 2) {
    return Response.json([]);
  }

  const apiKey = process.env.AVIATIONSTACK_API_KEY;
  if (!apiKey || apiKey === "your_api_key_here") {
    return Response.json(
      { error: "AVIATIONSTACK_API_KEY is not configured in .env.local" },
      { status: 500 }
    );
  }

  try {
    const url = new URL("https://api.aviationstack.com/v1/airports");
    url.searchParams.set("access_key", apiKey);
    url.searchParams.set("search", q);
    url.searchParams.set("limit", "20");

    const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
    if (!res.ok) {
      return Response.json({ error: "AviationStack error" }, { status: res.status });
    }

    const json = await res.json();
    const data = (json?.data ?? [])
      .filter(
        (a) =>
          a.iata_code &&
          a.iata_code !== "N/A" &&
          a.airport_name &&
          a.country_name
      )
      .slice(0, 10)
      .map((a) => ({
        iata_code: a.iata_code,
        airport_name: a.airport_name,
        city_name: a.city_iata_code || a.iata_code,
        country_name: a.country_name,
      }));

    return Response.json(data);
  } catch (err) {
    console.error("[airports API]", err);
    return Response.json({ error: "Internal error" }, { status: 500 });
  }
}
