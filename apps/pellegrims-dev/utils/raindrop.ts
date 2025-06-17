import { DateString } from '@pellegrims-dev/markdown';
import { CardProps } from '@pellegrims-dev/ui/organisms';

const shareTag = 'share';

export interface RaindropBookmark {
  title: string;
  link: string;
  cover: string;
  tags: string[];
  domain: string;
  excerpt: string;
  created: `${DateString}${string}`;
  _id: string;
}

export interface RaindropResponse {
  items: RaindropBookmark[];
  count: number;
  collectionId: number;
}

export interface PaginationParams {
  page?: number;
  perpage?: number;
}

function buildRaindropUrl({
  page = 0,
  perpage = 50,
}: PaginationParams = {}): string {
  return [
    'https://api.raindrop.io/rest/v1/raindrops/0',
    `?perpage=${Math.min(perpage, 50)}`,
    `&page=${page}`,
    '&sort=-created',
    `&search=%23${shareTag}`,
  ].join('');
}

export async function fetchRaindropBookmarks(
  params: PaginationParams = {}
): Promise<RaindropResponse> {
  const url = buildRaindropUrl(params);
  const res = await fetch(url, {
    method: 'get',
    headers: new Headers({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: `Bearer ${process.env.RAINDROP_ACCESS_TOKEN}`,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error(`Raindrop API error (${res.status}):`, errorText);
    throw new Error(
      `Failed to fetch bookmarks: ${res.status} ${res.statusText}`
    );
  }

  let data: {
    items?: RaindropBookmark[];
    count?: number;
    collectionId?: number;
  };
  try {
    data = await res.json();
  } catch {
    console.error('Failed to parse Raindrop API response as JSON');
    throw new Error('Invalid JSON response from Raindrop API');
  }

  return {
    items:
      data.items?.map((item) => ({
        ...item,
        tags: item.tags.filter((tag) => tag !== shareTag),
      })) ?? [],
    count: data.count ?? 0,
    collectionId: data.collectionId ?? 0,
  };
}

/**
 * Transforms a raw RaindropBookmark into CardProps format for display components
 */
export function formatBookmarkForDisplay(bookmark: RaindropBookmark): CardProps {
  return {
    ...bookmark,
    created: bookmark.created.slice(0, 10) as DateString,
    linkTarget: '_blank' as const,
  };
}

/**
 * Fetches all bookmarks across all pages for static generation
 */
export async function fetchAllRaindropBookmarks(): Promise<RaindropBookmark[]> {
  const allBookmarks: RaindropBookmark[] = [];
  let page = 0;
  let hasMore = true;

  while (hasMore) {
    try {
      const response = await fetchRaindropBookmarks({
        page,
        perpage: 50, // Use max page size
      });

      allBookmarks.push(...response.items);
      
      // If we got less than 50 items, we've reached the end
      hasMore = response.items.length === 50;
      page++;
    } catch (error) {
      console.error(`Error fetching page ${page}:`, error);
      break;
    }
  }

  return allBookmarks;
}

