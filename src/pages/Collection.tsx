import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { useAdmin } from "@/contexts/AdminContext";

const Collection = () => {
  const { products } = useAdmin();
  const [category, setCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];
  const filtered = category === "All" ? products : products.filter((p) => p.category === category);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="font-heading text-4xl font-bold text-foreground mb-3">Our Collection</h1>
        <p className="text-muted-foreground font-body">Explore our handcrafted silk sarees</p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-5 py-2 rounded-full text-sm font-body transition-colors ${
              category === c
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-primary/10"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground font-body py-16">No sarees found in this category.</p>
      )}
    </div>
  );
};

export default Collection;
