import { Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { ShoppingBag } from "lucide-react";

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();

  return (
    <div className="group bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-all duration-300">
      <div className="aspect-[3/4] overflow-hidden relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {product.originalPrice && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs px-2 py-1 rounded font-body">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 font-body">{product.category}</p>
        <h3 className="font-heading text-lg font-semibold text-foreground leading-tight mb-2">{product.name}</h3>
        <div className="flex items-center gap-2 mb-3">
          <span className="font-heading text-lg font-bold text-primary">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through font-body">₹{product.originalPrice.toLocaleString()}</span>
          )}
        </div>
        <button
          onClick={() => addToCart(product)}
          className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-md text-sm font-body hover:opacity-90 transition-opacity"
        >
          <ShoppingBag className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
