import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/file-proxy?url=<encoded-url>
 *
 * Server-side proxy to fetch files (PDB, CSV, PNG …) from external storage
 * (S3 / Azure Blob / etc.) and stream them back to the browser.
 * This avoids CORS errors when the browser tries to fetch those URLs directly.
 */
export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get("url");

  if (!raw) {
    return NextResponse.json({ error: "Missing `url` query parameter" }, { status: 400 });
  }

  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  // Optional: restrict to trusted hosts so the proxy can't be abused
  // const ALLOWED_HOSTS = ["s3.amazonaws.com", "your-bucket.blob.core.windows.net"];
  // if (!ALLOWED_HOSTS.some(h => url.hostname.endsWith(h))) {
  //   return NextResponse.json({ error: "Host not allowed" }, { status: 403 });
  // }

  try {
    const upstream = await fetch(url.toString(), {
      // Forward no auth headers to external storage; presigned URLs are self-authorising
      headers: { Accept: "*/*" },
      cache: "no-store",
    });

    if (!upstream.ok) {
      return NextResponse.json(
        { error: `Upstream returned ${upstream.status}` },
        { status: upstream.status }
      );
    }

    const contentType = upstream.headers.get("content-type") ?? "application/octet-stream";
    const body = await upstream.arrayBuffer();

    return new NextResponse(body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        // Allow the browser to cache public files for up to 5 minutes
        "Cache-Control": "public, max-age=300, stale-while-revalidate=60",
      },
    });
  } catch (err) {
    console.error("[file-proxy] fetch error:", err);
    return NextResponse.json({ error: "Failed to fetch remote file" }, { status: 502 });
  }
}
