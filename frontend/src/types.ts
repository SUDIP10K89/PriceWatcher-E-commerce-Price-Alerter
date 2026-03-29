export interface Product {
  id: string;
  name: string;
  store: string;
  icon: string;
  image: string;
  currentPrice: number;
  wasPrice: number;
  threshold: number;
  isBelowThreshold: boolean;
  lastChecked: string;
  history: { date: string; price: number }[];
}

export interface Alert {
  id: string;
  type: 'drop' | 'email' | 'slack';
  title: string;
  subtitle: string;
  price: number;
  wasPrice: number;
  isNew: boolean;
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: "Sony WH-1000XM5 Wireless Headphones",
    store: "Amazon",
    icon: "headphones",
    image: "https://picsum.photos/seed/headphones/400/300",
    currentPrice: 249.99,
    wasPrice: 349.99,
    threshold: 280,
    isBelowThreshold: true,
    lastChecked: "2 min ago",
    history: [
      { date: '1', price: 349.99 },
      { date: '2', price: 349.99 },
      { date: '3', price: 320.00 },
      { date: '4', price: 320.00 },
      { date: '5', price: 299.99 },
      { date: '6', price: 249.99 },
    ]
  },
  {
    id: '2',
    name: "ASUS ROG Zephyrus G14 Gaming Laptop RTX 4060",
    store: "Newegg",
    icon: "monitor",
    image: "https://picsum.photos/seed/laptop/400/300",
    currentPrice: 1099,
    wasPrice: 1299,
    threshold: 1100,
    isBelowThreshold: true,
    lastChecked: "18 min ago",
    history: [
      { date: '1', price: 1299 },
      { date: '2', price: 1299 },
      { date: '3', price: 1199 },
      { date: '4', price: 1199 },
      { date: '5', price: 1099 },
    ]
  },
  {
    id: '3',
    name: "Logitech MX Master 3S Wireless Mouse",
    store: "Best Buy",
    icon: "mouse",
    image: "https://picsum.photos/seed/mouse/400/300",
    currentPrice: 69.99,
    wasPrice: 99.99,
    threshold: 75,
    isBelowThreshold: true,
    lastChecked: "1 hr ago",
    history: [
      { date: '1', price: 99.99 },
      { date: '2', price: 99.99 },
      { date: '3', price: 89.99 },
      { date: '4', price: 69.99 },
    ]
  },
  {
    id: '4',
    name: "Samsung 990 Pro NVMe SSD 2TB",
    store: "Amazon",
    icon: "hdd",
    image: "https://picsum.photos/seed/ssd/400/300",
    currentPrice: 119.99,
    wasPrice: 149.99,
    threshold: 100,
    isBelowThreshold: false,
    lastChecked: "3 hr ago",
    history: [
      { date: '1', price: 149.99 },
      { date: '2', price: 149.99 },
      { date: '3', price: 139.99 },
      { date: '4', price: 119.99 },
    ]
  },
  {
    id: '5',
    name: "Apple AirPods Pro 2nd Generation",
    store: "eBay",
    icon: "airplay",
    image: "https://picsum.photos/seed/airpods/400/300",
    currentPrice: 189,
    wasPrice: 249,
    threshold: 175,
    isBelowThreshold: false,
    lastChecked: "5 hr ago",
    history: [
      { date: '1', price: 249 },
      { date: '2', price: 249 },
      { date: '3', price: 219 },
      { date: '4', price: 189 },
    ]
  },
  {
    id: '6',
    name: "LG 27GP850-B 27-inch QHD Monitor 165Hz",
    store: "Amazon",
    icon: "monitor",
    image: "https://picsum.photos/seed/monitor/400/300",
    currentPrice: 279.99,
    wasPrice: 399.99,
    threshold: 250,
    isBelowThreshold: false,
    lastChecked: "8 hr ago",
    history: [
      { date: '1', price: 399.99 },
      { date: '2', price: 399.99 },
      { date: '3', price: 349.99 },
      { date: '4', price: 279.99 },
    ]
  }
];

export const MOCK_ALERTS: Alert[] = [
  {
    id: '1',
    type: 'drop',
    title: "Sony WH-1000XM5 Headphones",
    subtitle: "Amazon · Below your $280 threshold · Slack notified",
    price: 249.99,
    wasPrice: 349.99,
    isNew: true
  },
  {
    id: '2',
    type: 'email',
    title: "ASUS ROG Zephyrus G14 Laptop",
    subtitle: "Newegg · Price drop detected · Email notified",
    price: 1099,
    wasPrice: 1299,
    isNew: true
  },
  {
    id: '3',
    type: 'slack',
    title: "Logitech MX Master 3S Mouse",
    subtitle: "Best Buy · Below your $75 threshold · Slack notified",
    price: 69.99,
    wasPrice: 99.99,
    isNew: false
  }
];
