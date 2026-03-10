import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session } from "@supabase/supabase-js";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: string;
  image: string;
  inStock: boolean;
  featured?: boolean;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "confirmed" | "shipped" | "delivered";
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

interface AdminContextType {
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  orders: Order[];
  updateOrderStatus: (id: string, status: Order["status"]) => Promise<void>;
  reviews: Review[];
  approveReview: (id: string) => Promise<void>;
  deleteReview: (id: string) => Promise<void>;
  refreshProducts: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Map DB row to Product
const mapProduct = (row: any): Product => ({
  id: row.id,
  name: row.name,
  price: Number(row.price),
  originalPrice: row.original_price ? Number(row.original_price) : undefined,
  description: row.description,
  category: row.category,
  image: row.image,
  inStock: row.in_stock,
  featured: row.featured,
});

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  // Auth
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Fetch products (public)
  const refreshProducts = useCallback(async () => {
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: true });
    if (data) setProducts(data.map(mapProduct));
  }, []);

  // Fetch orders & reviews (admin only)
  const fetchOrders = useCallback(async () => {
    const { data: ordersData } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    if (!ordersData) return;

    const orderIds = ordersData.map((o: any) => o.id);
    const { data: itemsData } = await supabase.from("order_items").select("*").in("order_id", orderIds);

    setOrders(ordersData.map((o: any): Order => ({
      id: o.id,
      orderNumber: o.order_number,
      customerName: o.customer_name,
      customerEmail: o.customer_email,
      customerPhone: o.customer_phone,
      customerAddress: o.customer_address,
      total: Number(o.total),
      status: o.status,
      paymentScreenshot: o.payment_screenshot,
      createdAt: new Date(o.created_at).toLocaleDateString(),
      items: (itemsData || []).filter((i: any) => i.order_id === o.id).map((i: any) => ({
        productId: i.product_id || "",
        productName: i.product_name,
        quantity: i.quantity,
        price: Number(i.price),
      })),
    })));
  }, []);

  const fetchReviews = useCallback(async () => {
    const { data } = await supabase.from("reviews").select("*").order("created_at", { ascending: false });
    if (data) setReviews(data.map((r: any): Review => ({
      id: r.id,
      productId: r.product_id,
      productName: r.product_name,
      customerName: r.customer_name,
      rating: r.rating,
      comment: r.comment,
      approved: r.approved,
      createdAt: new Date(r.created_at).toLocaleDateString(),
    })));
  }, []);

  // Load products on mount, orders/reviews when admin
  useEffect(() => { refreshProducts(); }, [refreshProducts]);
  useEffect(() => {
    if (session) { fetchOrders(); fetchReviews(); }
  }, [session, fetchOrders, fetchReviews]);

  const login = async (email: string, password: string): Promise<{ error: string | null }> => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message || null };
  };

  const logout = async () => { await supabase.auth.signOut(); };

  const addProduct = async (product: Omit<Product, "id">) => {
    await supabase.from("products").insert({
      name: product.name, price: product.price, original_price: product.originalPrice || null,
      description: product.description, category: product.category, image: product.image,
      in_stock: product.inStock, featured: product.featured || false,
    });
    await refreshProducts();
  };

  const updateProduct = async (id: string, data: Partial<Product>) => {
    const update: any = {};
    if (data.name !== undefined) update.name = data.name;
    if (data.price !== undefined) update.price = data.price;
    if (data.originalPrice !== undefined) update.original_price = data.originalPrice;
    if (data.description !== undefined) update.description = data.description;
    if (data.category !== undefined) update.category = data.category;
    if (data.image !== undefined) update.image = data.image;
    if (data.inStock !== undefined) update.in_stock = data.inStock;
    if (data.featured !== undefined) update.featured = data.featured;
    await supabase.from("products").update(update).eq("id", id);
    await refreshProducts();
  };

  const deleteProduct = async (id: string) => {
    await supabase.from("products").delete().eq("id", id);
    await refreshProducts();
  };

  const updateOrderStatus = async (id: string, status: Order["status"]) => {
    await supabase.from("orders").update({ status }).eq("id", id);
    await fetchOrders();
  };

  const approveReview = async (id: string) => {
    await supabase.from("reviews").update({ approved: true }).eq("id", id);
    await fetchReviews();
  };

  const deleteReview = async (id: string) => {
    await supabase.from("reviews").delete().eq("id", id);
    await fetchReviews();
  };

  return (
    <AdminContext.Provider value={{ isAdmin: !!session, loading, login, logout, products, addProduct, updateProduct, deleteProduct, orders, updateOrderStatus, reviews, approveReview, deleteReview, refreshProducts }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used within AdminProvider");
  return context;
};
