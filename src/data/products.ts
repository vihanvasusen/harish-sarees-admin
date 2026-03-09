export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: string;
  image: string;
  images?: string[];
  inStock: boolean;
  featured?: boolean;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  items: { productId: string; productName: string; quantity: number; price: number }[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  paymentScreenshot?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  productId: string;
  productName: string;
  customerName: string;
  rating: number;
  comment: string;
  approved: boolean;
  createdAt: string;
}

export const defaultProducts: Product[] = [
  {
    id: "1",
    name: "Royal Maroon Kanjeevaram Silk",
    price: 12500,
    originalPrice: 15000,
    description: "Exquisite handwoven Kanjeevaram silk saree in deep maroon with intricate gold zari border. Perfect for weddings and special occasions.",
    category: "Kanjeevaram",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop",
    inStock: true,
    featured: true,
  },
  {
    id: "2",
    name: "Golden Temple Border Pattu",
    price: 9800,
    originalPrice: 12000,
    description: "Traditional Dharmavaram pattu saree with rich golden temple border motifs. Handcrafted by master weavers.",
    category: "Pattu",
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=800&fit=crop",
    inStock: true,
    featured: true,
  },
  {
    id: "3",
    name: "Emerald Green Bridal Silk",
    price: 18500,
    description: "Luxurious bridal silk saree in emerald green with heavy gold zari work and peacock motifs throughout.",
    category: "Bridal",
    image: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600&h=800&fit=crop",
    inStock: true,
    featured: true,
  },
  {
    id: "4",
    name: "Ivory & Gold Celebration Saree",
    price: 8500,
    description: "Elegant ivory silk saree with delicate gold thread work. Ideal for festivals and celebrations.",
    category: "Festive",
    image: "https://images.unsplash.com/photo-1617627143233-46b828513fbb?w=600&h=800&fit=crop",
    inStock: true,
  },
  {
    id: "5",
    name: "Navy Blue Kanchipuram Silk",
    price: 14200,
    originalPrice: 16500,
    description: "Stunning navy blue Kanchipuram silk with contrast maroon border and traditional buttas.",
    category: "Kanjeevaram",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&h=800&fit=crop",
    inStock: true,
  },
  {
    id: "6",
    name: "Magenta Pochampally Ikat",
    price: 6800,
    description: "Vibrant magenta Pochampally ikat silk saree with geometric patterns. Lightweight and comfortable.",
    category: "Ikat",
    image: "https://images.unsplash.com/photo-1612722432474-b971cdcea546?w=600&h=800&fit=crop",
    inStock: true,
  },
];

export const defaultOrders: Order[] = [
  {
    id: "ORD001",
    customerName: "Priya Sharma",
    customerEmail: "priya@example.com",
    customerPhone: "9876543210",
    customerAddress: "12, MG Road, Bangalore, Karnataka",
    items: [{ productId: "1", productName: "Royal Maroon Kanjeevaram Silk", quantity: 1, price: 12500 }],
    total: 12500,
    status: "pending",
    createdAt: "2026-03-08",
  },
];

export const defaultReviews: Review[] = [
  {
    id: "REV001",
    productId: "1",
    productName: "Royal Maroon Kanjeevaram Silk",
    customerName: "Anita Reddy",
    rating: 5,
    comment: "Absolutely gorgeous saree! The quality is amazing and the color is exactly as shown.",
    approved: false,
    createdAt: "2026-03-07",
  },
];
