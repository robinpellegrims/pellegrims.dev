import type { NextRequest } from 'next/server';
import { fetchAllRaindropBookmarks, formatBookmarkForDisplay } from '@/utils/raindrop';
import { getCloudflareEnv } from '@/utils/cloudflare';

export const runtime = 'edge';

export default async function bookmarks(req: NextRequest) {
  if (req.method !== 'GET') {
    return new Response(null, { status: 405 });
  }

  try {
    const env = getCloudflareEnv();
    const token = env?.RAINDROP_ACCESS_TOKEN || process.env.RAINDROP_ACCESS_TOKEN;
    const allBookmarks = await fetchAllRaindropBookmarks(token);
    const formattedBookmarks = allBookmarks.map(formatBookmarkForDisplay);

    return new Response(JSON.stringify(formattedBookmarks), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=59',
      },
    });
  } catch (error) {
    console.error('Failed to fetch bookmarks in API:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch bookmarks' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=60',
      },
    });
  }
}
