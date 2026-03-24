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

export interface ShopifyProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: ShopifyMoney;
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
  variants: {
    edges: Array<{ node: ShopifyProductVariant }>;
  };
}

// ─── Cart Types ───────────────────────────────────────────────────────────────

export interface CartLineItem {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: {
      title: string;
      handle: string;
      images: {
        edges: Array<{ node: ShopifyImage }>;
      };
    };
  };
  cost: {
    totalAmount: ShopifyMoney;
  };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  lines: {
    edges: Array<{ node: CartLineItem }>;
  };
  cost: {
    subtotalAmount: ShopifyMoney;
    totalAmount: ShopifyMoney;
  };
}

// ─── GraphQL Fragments ────────────────────────────────────────────────────────

const CART_FRAGMENT = /* GraphQL */ `
  fragment CartFields on Cart {
    id
    checkoutUrl
    lines(first: 50) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              product {
                title
                handle
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
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
        }
      }
    }
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
    }
  }
`;

// ─── GraphQL Queries & Mutations ──────────────────────────────────────────────

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
          variants(first: 1) {
            edges {
              node {
                id
                title
                availableForSale
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;

const CART_CREATE_MUTATION = /* GraphQL */ `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        ...CartFields
      }
      userErrors {
        field
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;

const CART_LINES_ADD_MUTATION = /* GraphQL */ `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFields
      }
      userErrors {
        field
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;

const CART_LINES_REMOVE_MUTATION = /* GraphQL */ `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...CartFields
      }
      userErrors {
        field
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;

const CART_LINES_UPDATE_MUTATION = /* GraphQL */ `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFields
      }
      userErrors {
        field
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;

const CART_QUERY = /* GraphQL */ `
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      ...CartFields
    }
  }
  ${CART_FRAGMENT}
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

// ─── Products ─────────────────────────────────────────────────────────────────

export async function fetchProducts(count = 8): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<{ products: { edges: Array<{ node: ShopifyProduct }> } }>(
    PRODUCTS_QUERY,
    { first: count }
  );
  return data.products.edges.map((edge) => edge.node);
}

// ─── Cart ─────────────────────────────────────────────────────────────────────

export async function createCart(variantId?: string, quantity = 1): Promise<ShopifyCart> {
  const input = variantId
    ? { lines: [{ merchandiseId: variantId, quantity }] }
    : {};

  const data = await shopifyFetch<{ cartCreate: { cart: ShopifyCart } }>(
    CART_CREATE_MUTATION,
    { input }
  );
  return data.cartCreate.cart;
}

export async function addCartLines(cartId: string, variantId: string, quantity = 1): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartLinesAdd: { cart: ShopifyCart } }>(
    CART_LINES_ADD_MUTATION,
    { cartId, lines: [{ merchandiseId: variantId, quantity }] }
  );
  return data.cartLinesAdd.cart;
}

export async function removeCartLines(cartId: string, lineIds: string[]): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartLinesRemove: { cart: ShopifyCart } }>(
    CART_LINES_REMOVE_MUTATION,
    { cartId, lineIds }
  );
  return data.cartLinesRemove.cart;
}

export async function updateCartLines(cartId: string, lineId: string, quantity: number): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartLinesUpdate: { cart: ShopifyCart } }>(
    CART_LINES_UPDATE_MUTATION,
    { cartId, lines: [{ id: lineId, quantity }] }
  );
  return data.cartLinesUpdate.cart;
}

export async function fetchCart(cartId: string): Promise<ShopifyCart | null> {
  try {
    const data = await shopifyFetch<{ cart: ShopifyCart | null }>(
      CART_QUERY,
      { cartId }
    );
    return data.cart;
  } catch {
    return null;
  }
}

// ─── Product Detail Types ─────────────────────────────────────────────────────

export interface ShopifyProductOption {
  id: string;
  name: string;
  values: string[];
}

export interface ShopifyVariantDetail {
  id: string;
  sku: string;
  title: string;
  availableForSale: boolean;
  price: ShopifyMoney;
  compareAtPrice: ShopifyMoney | null;
  selectedOptions: Array<{ name: string; value: string }>;
  image: ShopifyImage | null;
}

export interface ShopifyProductDetail {
  id: string;
  title: string;
  handle: string;
  productType: string;
  descriptionHtml: string;
  description: string;
  vendor: string;
  tags: string[];
  onlineStoreUrl: string | null;
  seo: { title: string | null; description: string | null };
  priceRange: {
    minVariantPrice: ShopifyMoney;
    maxVariantPrice: ShopifyMoney;
  };
  compareAtPriceRange: {
    minVariantPrice: ShopifyMoney;
  };
  options: ShopifyProductOption[];
  images: {
    edges: Array<{ node: ShopifyImage }>;
  };
  variants: {
    edges: Array<{ node: ShopifyVariantDetail }>;
  };
}

// ─── Product Detail Query ─────────────────────────────────────────────────────

const PRODUCT_BY_HANDLE_QUERY = /* GraphQL */ `
  query getProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      productType
      descriptionHtml
      description
      vendor
      tags
      onlineStoreUrl
      seo { title description }
      priceRange {
        minVariantPrice { amount currencyCode }
        maxVariantPrice { amount currencyCode }
      }
      compareAtPriceRange {
        minVariantPrice { amount currencyCode }
      }
      options { id name values }
      images(first: 20) {
        edges { node { url altText } }
      }
      variants(first: 100) {
        edges {
          node {
            id
            sku
            title
            availableForSale
            price { amount currencyCode }
            compareAtPrice { amount currencyCode }
            selectedOptions { name value }
            image { url altText }
          }
        }
      }
    }
  }
`;

export async function fetchProductByHandle(handle: string): Promise<ShopifyProductDetail | null> {
  try {
    const data = await shopifyFetch<{ product: ShopifyProductDetail | null }>(
      PRODUCT_BY_HANDLE_QUERY,
      { handle }
    );
    return data.product;
  } catch {
    return null;
  }
}

// ─── Collection Products Query ────────────────────────────────────────────────

const COLLECTION_PRODUCTS_QUERY = /* GraphQL */ `
  query getCollectionProducts($handle: String!, $first: Int!, $after: String) {
    collection(handle: $handle) {
      id
      title
      handle
      products(first: $first, after: $after) {
        pageInfo { hasNextPage endCursor }
        edges {
          node {
            id
            title
            handle
            productType
            onlineStoreUrl
            priceRange {
              minVariantPrice { amount currencyCode }
            }
            images(first: 1) {
              edges { node { url altText } }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  price { amount currencyCode }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export async function fetchCollectionProducts(
  handle: string,
  first = 100
): Promise<ShopifyProduct[]> {
  let allProducts: ShopifyProduct[] = [];
  let cursor: string | null = null;
  let hasNextPage = true;

  while (hasNextPage) {
    const data = await shopifyFetch<{
      collection: {
        products: {
          pageInfo: { hasNextPage: boolean; endCursor: string };
          edges: Array<{ node: ShopifyProduct }>;
        };
      } | null;
    }>(COLLECTION_PRODUCTS_QUERY, { handle, first, after: cursor });

    if (!data.collection) break;

    const { edges, pageInfo } = data.collection.products;
    allProducts = allProducts.concat(edges.map((e) => e.node));
    hasNextPage = pageInfo.hasNextPage;
    cursor = pageInfo.endCursor;
  }

  return allProducts;
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
