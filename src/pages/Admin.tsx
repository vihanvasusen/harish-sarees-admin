import { useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { useNavigate } from "react-router-dom";
import AdminLogin from "@/pages/AdminLogin";
import { Package, ShoppingCart, Star, LogOut, Plus, Pencil, Trash2, Check, X } from "lucide-react";
import type { Product, Order } from "@/data/products";

const Admin = () => {
  const { isAdmin, logout, products, addProduct, updateProduct, deleteProduct, orders, updateOrderStatus, reviews, approveReview, deleteReview } = useAdmin();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"products" | "orders" | "reviews">("products");
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  if (!isAdmin) return <AdminLogin />;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground font-body text-sm">Manage your store</p>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 text-sm font-body text-muted-foreground hover:text-destructive transition-colors">
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-card border border-border rounded-lg p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center"><Package className="w-5 h-5 text-primary" /></div>
          <div><p className="text-2xl font-heading font-bold text-foreground">{products.length}</p><p className="text-xs text-muted-foreground font-body">Products</p></div>
        </div>
        <div className="bg-card border border-border rounded-lg p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center"><ShoppingCart className="w-5 h-5 text-accent" /></div>
          <div><p className="text-2xl font-heading font-bold text-foreground">{orders.length}</p><p className="text-xs text-muted-foreground font-body">Orders</p></div>
        </div>
        <div className="bg-card border border-border rounded-lg p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center"><Star className="w-5 h-5 text-primary" /></div>
          <div><p className="text-2xl font-heading font-bold text-foreground">{reviews.filter(r => !r.approved).length}</p><p className="text-xs text-muted-foreground font-body">Pending Reviews</p></div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-secondary rounded-lg p-1 w-fit">
        {(["products", "orders", "reviews"] as const).map((t) => (
          <button
            key={t}
            onClick={() => { setTab(t); setShowForm(false); setEditingProduct(null); }}
            className={`px-4 py-2 rounded-md text-sm font-body capitalize transition-colors ${tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Products Tab */}
      {tab === "products" && (
        <div>
          {!showForm && !editingProduct && (
            <>
              <button onClick={() => setShowForm(true)} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-body mb-4 hover:opacity-90 transition-opacity">
                <Plus className="w-4 h-4" /> Add Product
              </button>
              <div className="grid gap-3">
                {products.map((p) => (
                  <div key={p.id} className="bg-card border border-border rounded-lg p-4 flex items-center gap-4">
                    <img src={p.image} alt={p.name} className="w-16 h-20 object-cover rounded" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading font-semibold text-foreground truncate">{p.name}</h3>
                      <p className="text-sm text-muted-foreground font-body">{p.category} • ₹{p.price.toLocaleString()}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => setEditingProduct(p)} className="p-2 text-muted-foreground hover:text-primary transition-colors"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => { if (confirm("Delete this product?")) deleteProduct(p.id); }} className="p-2 text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {(showForm || editingProduct) && (
            <ProductForm
              product={editingProduct}
              onSave={(data) => {
                if (editingProduct) { updateProduct(editingProduct.id, data); }
                else { addProduct(data as Omit<Product, "id">); }
                setShowForm(false);
                setEditingProduct(null);
              }}
              onCancel={() => { setShowForm(false); setEditingProduct(null); }}
            />
          )}
        </div>
      )}

      {/* Orders Tab */}
      {tab === "orders" && (
        <div className="space-y-4">
          {orders.length === 0 && <p className="text-muted-foreground font-body text-center py-8">No orders yet.</p>}
          {orders.map((o) => (
            <div key={o.id} className="bg-card border border-border rounded-lg p-5">
              <div className="flex flex-col sm:flex-row justify-between gap-2 mb-3">
                <div>
                  <h3 className="font-heading font-semibold text-foreground">{o.id} — {o.customerName}</h3>
                  <p className="text-sm text-muted-foreground font-body">{o.customerPhone} • {o.customerEmail}</p>
                  <p className="text-sm text-muted-foreground font-body">{o.customerAddress}</p>
                </div>
                <div className="text-right">
                  <p className="font-heading font-bold text-foreground">₹{o.total.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground font-body">{o.createdAt}</p>
                </div>
              </div>
              <div className="text-sm font-body text-muted-foreground mb-3">
                {o.items.map((item, i) => <p key={i}>{item.productName} × {item.quantity} = ₹{(item.price * item.quantity).toLocaleString()}</p>)}
              </div>
              {o.paymentScreenshot && <img src={o.paymentScreenshot} alt="Payment" className="w-40 h-auto rounded border border-border mb-3" />}
              <select
                value={o.status}
                onChange={(e) => updateOrderStatus(o.id, e.target.value as Order["status"])}
                className="px-3 py-1.5 rounded border border-input bg-background text-foreground text-sm font-body"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          ))}
        </div>
      )}

      {/* Reviews Tab */}
      {tab === "reviews" && (
        <div className="space-y-4">
          {reviews.length === 0 && <p className="text-muted-foreground font-body text-center py-8">No reviews yet.</p>}
          {reviews.map((r) => (
            <div key={r.id} className="bg-card border border-border rounded-lg p-5">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="font-heading font-semibold text-foreground">{r.customerName}</h3>
                  <p className="text-sm text-muted-foreground font-body">{r.productName} • {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</p>
                  <p className="text-sm text-foreground font-body mt-2">{r.comment}</p>
                  <p className="text-xs text-muted-foreground font-body mt-1">{r.createdAt}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  {!r.approved && (
                    <button onClick={() => approveReview(r.id)} className="p-2 text-green-600 hover:bg-green-50 rounded transition-colors" title="Approve">
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                  <button onClick={() => deleteReview(r.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded transition-colors" title="Delete">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {r.approved && <span className="inline-block mt-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded font-body">Approved</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Product Form Component
const ProductForm = ({ product, onSave, onCancel }: { product: Product | null; onSave: (data: Partial<Product>) => void; onCancel: () => void }) => {
  const [name, setName] = useState(product?.name || "");
  const [price, setPrice] = useState(product?.price?.toString() || "");
  const [originalPrice, setOriginalPrice] = useState(product?.originalPrice?.toString() || "");
  const [description, setDescription] = useState(product?.description || "");
  const [category, setCategory] = useState(product?.category || "");
  const [image, setImage] = useState(product?.image || "");
  const [inStock, setInStock] = useState(product?.inStock ?? true);
  const [featured, setFeatured] = useState(product?.featured ?? false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name, price: Number(price), originalPrice: originalPrice ? Number(originalPrice) : undefined,
      description, category, image, inStock, featured,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6 max-w-lg space-y-4">
      <h2 className="font-heading text-xl font-semibold text-foreground">{product ? "Edit Product" : "Add Product"}</h2>
      {[
        { label: "Name", value: name, set: setName, type: "text" },
        { label: "Price (₹)", value: price, set: setPrice, type: "number" },
        { label: "Original Price (₹, optional)", value: originalPrice, set: setOriginalPrice, type: "number" },
        { label: "Category", value: category, set: setCategory, type: "text" },
        { label: "Image URL", value: image, set: setImage, type: "url" },
      ].map((f) => (
        <div key={f.label}>
          <label className="block text-sm font-body text-foreground mb-1">{f.label}</label>
          <input
            type={f.type}
            value={f.value}
            onChange={(e) => f.set(e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            required={f.label !== "Original Price (₹, optional)"}
          />
        </div>
      ))}
      <div>
        <label className="block text-sm font-body text-foreground mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          required
        />
      </div>
      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm font-body text-foreground">
          <input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} className="rounded" /> In Stock
        </label>
        <label className="flex items-center gap-2 text-sm font-body text-foreground">
          <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="rounded" /> Featured
        </label>
      </div>
      <div className="flex gap-3">
        <button type="submit" className="bg-primary text-primary-foreground px-6 py-2 rounded-md text-sm font-body font-semibold hover:opacity-90 transition-opacity">
          {product ? "Update" : "Add"} Product
        </button>
        <button type="button" onClick={onCancel} className="text-muted-foreground text-sm font-body hover:text-foreground transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Admin;
