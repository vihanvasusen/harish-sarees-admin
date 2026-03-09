import { Link } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { useAdmin } from "@/contexts/AdminContext";

const Index = () => {
  const { products } = useAdmin();
  const featured = products.filter((p) => p.featured).slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-maroon text-primary-foreground py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="container mx-auto px-4 text-center relative z-10">
          <p className="text-gold-light text-sm md:text-base tracking-[0.3em] uppercase mb-4 font-body animate-fade-in">
            Dharmavaram • Andhra Pradesh
          </p>
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in leading-tight">
            Harish Sarees
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-8 font-body animate-fade-in">
            Handmade Premium Silk Sarees for Every Occasion
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Link
              to="/collection"
              className="inline-block bg-accent text-accent-foreground px-8 py-3 rounded-md font-body font-semibold hover:opacity-90 transition-opacity text-sm tracking-wide"
            >
              Explore Collection
            </Link>
            <a
              href="https://wa.me/918867676906"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-primary-foreground/40 text-primary-foreground px-8 py-3 rounded-md font-body hover:bg-primary-foreground/10 transition-colors text-sm tracking-wide"
            >
              Order on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { title: "Handwoven", desc: "Each saree crafted by master artisans of Dharmavaram" },
            { title: "Pure Silk", desc: "100% authentic silk with premium quality zari work" },
            { title: "Pan-India Shipping", desc: "Safe delivery across India with secure packaging" },
          ].map((f) => (
            <div key={f.title} className="p-6">
              <h3 className="font-heading text-xl font-semibold text-primary mb-2">{f.title}</h3>
              <p className="text-muted-foreground font-body text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">Featured Sarees</h2>
          <p className="text-muted-foreground font-body">Our most loved pieces, handpicked for you</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
        <div className="text-center mt-10">
          <Link
            to="/collection"
            className="inline-block border-2 border-primary text-primary px-8 py-3 rounded-md font-body font-semibold hover:bg-primary hover:text-primary-foreground transition-colors text-sm tracking-wide"
          >
            View All Sarees
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-maroon text-primary-foreground text-center">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold mb-4">Have Questions?</h2>
          <p className="font-body opacity-90 mb-6 max-w-lg mx-auto">
            Reach out to us on WhatsApp or visit our store in Dharmavaram for a personalized saree shopping experience.
          </p>
          <a
            href="tel:8867676906"
            className="inline-block bg-accent text-accent-foreground px-8 py-3 rounded-md font-body font-semibold hover:opacity-90 transition-opacity"
          >
            Call Us: 8867676906
          </a>
        </div>
      </section>
    </div>
  );
};

export default Index;
