// Mock data for development — replaces database queries until backend is wired up

export interface Auction {
  id: string;
  title: string;
  brand: string;
  category: string;
  lotSize: number;
  condition: "new_with_tags" | "new_without_tags" | "like_new" | "used";
  images: string[];
  startPrice: number;
  currentBid: number | null;
  reservePrice: number | null;
  buyNowPrice: number | null;
  bidIncrement: number;
  totalBids: number;
  startTime: string;
  endTime: string;
  status: "scheduled" | "live" | "ended" | "settled" | "cancelled";
  seller: {
    name: string;
    isVerified: boolean;
    rating: number;
  };
}

export interface Bid {
  id: string;
  auctionId: string;
  bidderAlias: string;
  amount: number;
  placedAt: string;
}

const now = Date.now();
const HOUR = 3600000;
const MIN = 60000;

export const MOCK_AUCTIONS: Auction[] = [
  {
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    title: "Premium Cotton T-Shirts — Assorted Colors (200 pcs)",
    brand: "FabIndia",
    category: "T-Shirts",
    lotSize: 200,
    condition: "new_with_tags",
    images: ["/placeholder-tshirt.jpg"],
    startPrice: 12000,
    currentBid: 18500,
    reservePrice: 15000,
    buyNowPrice: 35000,
    bidIncrement: 250,
    totalBids: 14,
    startTime: new Date(now - 2 * HOUR).toISOString(),
    endTime: new Date(now + 47 * MIN).toISOString(),
    status: "live",
    seller: { name: "FabIndia Outlet", isVerified: true, rating: 4.8 },
  },
  {
    id: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
    title: "Designer Kurta Set — Block Print (50 pcs)",
    brand: "Biba",
    category: "Ethnic Wear",
    lotSize: 50,
    condition: "new_with_tags",
    images: ["/placeholder-kurta.jpg"],
    startPrice: 25000,
    currentBid: 31000,
    reservePrice: 28000,
    buyNowPrice: null,
    bidIncrement: 500,
    totalBids: 8,
    startTime: new Date(now - 1 * HOUR).toISOString(),
    endTime: new Date(now + 2 * MIN).toISOString(),
    status: "live",
    seller: { name: "Biba Clearance", isVerified: true, rating: 4.6 },
  },
  {
    id: "c3d4e5f6-a7b8-9012-cdef-123456789012",
    title: "Denim Jackets — Vintage Wash (120 pcs)",
    brand: "Levi's",
    category: "Jackets",
    lotSize: 120,
    condition: "new_without_tags",
    images: ["/placeholder-jacket.jpg"],
    startPrice: 45000,
    currentBid: 52000,
    reservePrice: 50000,
    buyNowPrice: 85000,
    bidIncrement: 500,
    totalBids: 11,
    startTime: new Date(now - 3 * HOUR).toISOString(),
    endTime: new Date(now + 1.5 * HOUR).toISOString(),
    status: "live",
    seller: { name: "Levi's India Surplus", isVerified: true, rating: 4.9 },
  },
  {
    id: "d4e5f6a7-b8c9-0123-defa-234567890123",
    title: "Sports Shorts — Quick Dry (300 pcs)",
    brand: "HRX",
    category: "Activewear",
    lotSize: 300,
    condition: "new_with_tags",
    images: ["/placeholder-shorts.jpg"],
    startPrice: 8000,
    currentBid: 11500,
    reservePrice: null,
    buyNowPrice: 22000,
    bidIncrement: 250,
    totalBids: 19,
    startTime: new Date(now - 4 * HOUR).toISOString(),
    endTime: new Date(now + 22 * MIN).toISOString(),
    status: "live",
    seller: { name: "HRX Warehouse", isVerified: false, rating: 4.2 },
  },
  {
    id: "e5f6a7b8-c9d0-1234-efab-345678901234",
    title: "Linen Shirts — Summer Collection (80 pcs)",
    brand: "Allen Solly",
    category: "Shirts",
    lotSize: 80,
    condition: "new_with_tags",
    images: ["/placeholder-shirt.jpg"],
    startPrice: 20000,
    currentBid: null,
    reservePrice: 18000,
    buyNowPrice: 40000,
    bidIncrement: 500,
    totalBids: 0,
    startTime: new Date(now + 2 * HOUR).toISOString(),
    endTime: new Date(now + 26 * HOUR).toISOString(),
    status: "scheduled",
    seller: { name: "Allen Solly Exports", isVerified: true, rating: 4.7 },
  },
  {
    id: "f6a7b8c9-d0e1-2345-fabc-456789012345",
    title: "Silk Sarees — Handloom (25 pcs)",
    brand: "Nalli",
    category: "Sarees",
    lotSize: 25,
    condition: "new_with_tags",
    images: ["/placeholder-saree.jpg"],
    startPrice: 75000,
    currentBid: 92000,
    reservePrice: 80000,
    buyNowPrice: null,
    bidIncrement: 1000,
    totalBids: 6,
    startTime: new Date(now - 20 * HOUR).toISOString(),
    endTime: new Date(now - 2 * HOUR).toISOString(),
    status: "ended",
    seller: { name: "Nalli Silks", isVerified: true, rating: 4.9 },
  },
];

export const MOCK_BIDS: Bid[] = [
  { id: "bid-1", auctionId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890", bidderAlias: "user_7f3a", amount: 18500, placedAt: new Date(now - 5 * MIN).toISOString() },
  { id: "bid-2", auctionId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890", bidderAlias: "user_2b9c", amount: 18000, placedAt: new Date(now - 12 * MIN).toISOString() },
  { id: "bid-3", auctionId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890", bidderAlias: "user_4d1e", amount: 17500, placedAt: new Date(now - 18 * MIN).toISOString() },
  { id: "bid-4", auctionId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890", bidderAlias: "user_9a5f", amount: 16500, placedAt: new Date(now - 25 * MIN).toISOString() },
  { id: "bid-5", auctionId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890", bidderAlias: "user_7f3a", amount: 15000, placedAt: new Date(now - 40 * MIN).toISOString() },
  { id: "bid-6", auctionId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890", bidderAlias: "user_6c2d", amount: 14000, placedAt: new Date(now - 55 * MIN).toISOString() },
  { id: "bid-7", auctionId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890", bidderAlias: "user_2b9c", amount: 13500, placedAt: new Date(now - HOUR).toISOString() },
  { id: "bid-8", auctionId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890", bidderAlias: "user_8e7g", amount: 12500, placedAt: new Date(now - 1.5 * HOUR).toISOString() },
];

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getTimeRemaining(endTime: string) {
  const total = new Date(endTime).getTime() - Date.now();
  if (total <= 0) return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  return { total, days, hours, minutes, seconds };
}

export function getBidIncrement(currentBid: number): number {
  if (currentBid < 1000) return 50;
  if (currentBid < 5000) return 100;
  if (currentBid < 20000) return 250;
  if (currentBid < 100000) return 500;
  return 1000;
}
