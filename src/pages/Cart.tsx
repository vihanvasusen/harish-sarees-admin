import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
        <h1 className="font-heading text-3xl font-bold text-foreground mb-3">Your Cart is Empty</h1>
        <p className="text-muted-foreground font-body mb-6">Browse our beautiful collection and add sarees to your cart.</p>
        <Link to="/collection" className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-md font-body font-semibold hover:opacity-90 transition-opacity">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-heading text-4xl font-bold text-foreground mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="bg-card border border-border rounded-lg p-4 flex gap-4">
              <img src={product.image} alt={product.name} className="w-24 h-32 object-cover rounded" />
              <div className="flex-1">
                <h3 className="font-heading font-semibold text-foreground">{product.name}</h3>
                <p className="text-sm text-muted-foreground font-body">{product.category}</p>
                <p className="font-heading font-bold text-primary mt-1">₹{product.price.toLocaleString()}</p>
                <div className="flex items-center gap-3 mt-3">
                  <button onClick={() => updateQuantity(product.id, quantity - 1)} className="w-8 h-8 rounded border border-border flex items-center justify-center hover:bg-muted transition-colors">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-body w-8 text-center">{quantity}</span>
                  <button onClick={() => updateQuantity(product.id, quantity + 1)} className="w-8 h-8 rounded border border-border flex items-center justify-center hover:bg-muted transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                  <button onClick={() => removeFromCart(product.id)} className="ml-auto text-destructive hover:opacity-70 transition-opacity">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-lg p-6 h-fit sticky top-24">
          <h2 className="font-heading text-xl font-semibold text-foreground mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4 font-body text-sm">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex justify-between text-muted-foreground">
                <span>{product.name} × {quantity}</span>
                <span>₹{(product.price * quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-4 flex justify-between font-heading font-bold text-lg text-foreground">
            <span>Total</span>
            <span>₹{totalPrice.toLocaleString()}</span>
          </div>
          <a
            href={`https://wa.me/918867676906?text=${encodeURIComponent(`Hi, I'd like to order:\n${items.map(i => `${i.product.name} × ${i.quantity} = ₹${(i.product.price * i.quantity).toLocaleString()}`).join('\n')}\n\nTotal: ₹${totalPrice.toLocaleString()}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-primary text-primary-foreground py-3 rounded-md text-center font-body font-semibold hover:opacity-90 transition-opacity mt-6"
          >
            Order via WhatsApp
          </a>
          <button onClick={clearCart} className="block w-full text-muted-foreground text-sm font-body mt-3 hover:text-destructive transition-colors">
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
