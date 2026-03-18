const SHOPIFY_STORE_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN as string;
const SHOPIFY_STOREFRONT_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN as string;
const API_VERSION = '2026-01';

export const STOREFRONT_ENDPOINT = `https://${SHOPIFY_STORE_DOMAIN}/api/${API_VERSION}/graphql.json`;

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ShopifyImage {
  url: string;
  altText: string | null;
}

export interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  productType: string;
  onlineStoreUrl: string | null;
  priceRange: {
    minVariantPrice: ShopifyMoney;
  };
  images: {
    edges: Array<{ node: ShopifyImage }>;
  };
}

// ─── GraphQL Query ─────────────────────────────────────────────────────────────

const PRODUCTS_QUERY = /* GraphQL */ `
  query GetProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          productType
          onlineStoreUrl
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`;

// ─── Client ───────────────────────────────────────────────────────────────────

async function shopifyFetch<T>(query: string, variables: Record<string, unknown>): Promise<T> {
  const response = await fetch(STOREFRONT_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.status} ${response.statusText}`);
  }

  const json = await response.json();

  if (json.errors) {
    throw new Error(json.errors.map((e: { message: string }) => e.message).join(', '));
  }

  return json.data as T;
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function fetchProducts(count = 8): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<{ products: { edges: Array<{ node: ShopifyProduct }> } }>(
    PRODUCTS_QUERY,
    { first: count }
  );
  return data.products.edges.map((edge) => edge.node);
}

// ─── Category Images ──────────────────────────────────────────────────────────

export interface CategoryImages {
  spirals: string | null;
  diamond: string | null;
  sawBlades: string | null;
}

const CATEGORY_IMAGES_QUERY = /* GraphQL */ `{
  spirals: products(first: 1, query: "spiral") {
    edges { node { images(first: 1) { edges { node { url } } } } }
  }
  diamond: products(first: 1, query: "diamond") {
    edges { node { images(first: 1) { edges { node { url } } } } }
  }
  sawBlades: collection(handle: "saw-blades") {
    image { url }
  }
}`;

export async function fetchCategoryImages(): Promise<CategoryImages> {
  const data = await shopifyFetch<{
    spirals: { edges: Array<{ node: { images: { edges: Array<{ node: { url: string } }> } } }> };
    diamond: { edges: Array<{ node: { images: { edges: Array<{ node: { url: string } }> } } }> };
    sawBlades: { image: { url: string } | null } | null;
  }>(CATEGORY_IMAGES_QUERY, {});

  return {
    spirals: data.spirals?.edges[0]?.node?.images?.edges[0]?.node?.url ?? null,
    diamond: data.diamond?.edges[0]?.node?.images?.edges[0]?.node?.url ?? null,
    sawBlades: data.sawBlades?.image?.url ?? null,
  };
}
