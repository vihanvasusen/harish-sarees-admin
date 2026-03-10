import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Product, Order, Review, defaultProducts, defaultOrders, defaultReviews } from "@/data/products";
import type { Session } from "@supabase/supabase-js";

interface AdminContextType {
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  orders: Order[];
  updateOrderStatus: (id: string, status: Order["status"]) => void;
  reviews: Review[];
  approveReview: (id: string) => void;
  deleteReview: (id: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem("harish-products");
    return saved ? JSON.parse(saved) : defaultProducts;
  });
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem("harish-orders");
    return saved ? JSON.parse(saved) : defaultOrders;
  });
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem("harish-reviews");
    return saved ? JSON.parse(saved) : defaultReviews;
  });

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

  const save = (key: string, data: unknown) => localStorage.setItem(key, JSON.stringify(data));

  const login = async (email: string, password: string): Promise<{ error: string | null }> => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    return { error: null };
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const addProduct = (product: Omit<Product, "id">) => {
    const newProduct = { ...product, id: Date.now().toString() };
    const updated = [...products, newProduct];
    setProducts(updated);
    save("harish-products", updated);
  };

  const updateProduct = (id: string, data: Partial<Product>) => {
    const updated = products.map((p) => (p.id === id ? { ...p, ...data } : p));
    setProducts(updated);
    save("harish-products", updated);
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    save("harish-products", updated);
  };

  const updateOrderStatus = (id: string, status: Order["status"]) => {
    const updated = orders.map((o) => (o.id === id ? { ...o, status } : o));
    setOrders(updated);
    save("harish-orders", updated);
  };

  const approveReview = (id: string) => {
    const updated = reviews.map((r) => (r.id === id ? { ...r, approved: true } : r));
    setReviews(updated);
    save("harish-reviews", updated);
  };

  const deleteReview = (id: string) => {
    const updated = reviews.filter((r) => r.id !== id);
    setReviews(updated);
    save("harish-reviews", updated);
  };

  return (
    <AdminContext.Provider value={{ isAdmin: !!session, loading, login, logout, products, addProduct, updateProduct, deleteProduct, orders, updateOrderStatus, reviews, approveReview, deleteReview }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used within AdminProvider");
  return context;
};
