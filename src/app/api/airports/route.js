import { AIRPORTS } from "@/imports/core/constants/airports";

function mapApiAirport(apiAirport, included = []) {
  const attr = apiAirport.attributes;
  const iata = attr.iata_code?.toUpperCase();
  if (!iata || iata.length !== 3) return null;

  const localMatch = AIRPORTS.find(
    (a) => a.iata_code.toUpperCase() === iata
  );

  if (localMatch) {
    return localMatch;
  }

  const countryId = apiAirport.relationships?.country?.data?.id;
  const regionId = apiAirport.relationships?.region?.data?.id;

  const countryObj = included.find(
    (item) => item.type === "countries" && item.id === countryId
  );
  const regionObj = included.find(
    (item) => item.type === "regions" && item.id === regionId
  );

  const countryName = countryObj?.attributes?.name || "";
  const cityName = regionObj?.attributes?.name || attr.local_code || iata;

  return {
    iata_code: iata,
    airport_name: attr.name || "",
    city_name: cityName,
    country_name: countryName,
  };
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim() || "";

  if (q.length < 2) {
    return Response.json([]);
  }

  const results = [];
  const seen = new Set();

  const queryLower = q.toLowerCase();
  const localMatches = AIRPORTS.filter(
    (a) =>
      a.iata_code.toLowerCase().startsWith(queryLower) ||
      a.airport_name.toLowerCase().includes(queryLower) ||
      a.city_name.toLowerCase().includes(queryLower) ||
      a.country_name.toLowerCase().includes(queryLower)
  );

  for (const item of localMatches) {
    results.push(item);
    seen.add(item.iata_code.toUpperCase());
  }

  try {
    const listRes = await fetch(
      `https://airportsapi.com/api/airports?filter[name]=${encodeURIComponent(q)}&include=country,region`,
      { next: { revalidate: 86400 } }
    );

    if (listRes.ok) {
      const json = await listRes.json();
      const listData = json?.data ?? [];
      const included = json?.included ?? [];

      for (const item of listData) {
        if (item && item.attributes) {
          const mapped = mapApiAirport(item, included);
          if (mapped && !seen.has(mapped.iata_code)) {
            results.push(mapped);
            seen.add(mapped.iata_code);
          }
        }
      }
    }
  } catch (err) {
    console.warn("[airportsapi list fetch failed]", err);
  }

  if (q.length === 3) {
    const iataQuery = q.toUpperCase();
    if (!seen.has(iataQuery)) {
      try {
        const singleRes = await fetch(
          `https://airportsapi.com/api/airports/${iataQuery}?include=country,region`,
          { next: { revalidate: 86400 } }
        );

        if (singleRes.ok) {
          const json = await singleRes.json();
          const apiAirport = json?.data;
          const included = json?.included ?? [];

          if (apiAirport && apiAirport.attributes) {
            const mapped = mapApiAirport(apiAirport, included);
            if (mapped && !seen.has(mapped.iata_code)) {
              results.push(mapped);
              seen.add(mapped.iata_code);
            }
          }
        }
      } catch (err) {
        console.warn("[airportsapi single fetch failed]", err);
      }
    }
  }

  return Response.json(results.slice(0, 10));
}
