import { NextRequest, NextResponse } from "next/server";

// Never statically cache this route — each request must be handled fresh.
export const dynamic = "force-dynamic";

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
    const contentDisposition = upstream.headers.get("content-disposition");
    const body = await upstream.arrayBuffer();

    const headers: Record<string, string> = {
      "Content-Type": contentType,
      // Must be private + no-store so no shared cache (CDN / reverse-proxy)
      // can serve one file's response for a completely different URL.
      "Cache-Control": "private, no-store",
    };
    if (contentDisposition) headers["Content-Disposition"] = contentDisposition;

    return new NextResponse(body, { status: 200, headers });
  } catch (err) {
    console.error("[file-proxy] fetch error:", err);
    return NextResponse.json({ error: "Failed to fetch remote file" }, { status: 502 });
  }
}

/**
 * HEAD /api/file-proxy?url=<encoded-url>
 *
 * Lightweight metadata-only request. Sends a HEAD to the upstream URL and
 * returns Content-Disposition / Content-Type so the client can show the
 * real filename without downloading the entire file.
 */
export async function HEAD(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get("url");

  if (!raw) {
    return new NextResponse(null, { status: 400 });
  }

  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return new NextResponse(null, { status: 400 });
  }

  try {
    const upstream = await fetch(url.toString(), {
      method: "HEAD",
      headers: { Accept: "*/*" },
      cache: "no-store",
    });

    if (!upstream.ok) {
      return new NextResponse(null, { status: upstream.status });
    }

    const headers: Record<string, string> = {
      "Cache-Control": "private, no-store",
      "Access-Control-Expose-Headers": "Content-Disposition, Content-Type",
    };

    const ct = upstream.headers.get("content-type");
    if (ct) headers["Content-Type"] = ct;

    const cd = upstream.headers.get("content-disposition");
    if (cd) headers["Content-Disposition"] = cd;

    return new NextResponse(null, { status: 200, headers });
  } catch (err) {
    console.error("[file-proxy] HEAD error:", err);
    return new NextResponse(null, { status: 502 });
  }
}
