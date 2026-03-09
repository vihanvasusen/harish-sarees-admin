import { Link } from "react-router-dom";
import { ShoppingBag, Menu, X, User } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";

const Header = () => {
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/collection", label: "Collection" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    { to: "/admin", label: "Admin" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex flex-col">
          <span className="font-heading text-2xl font-bold text-primary tracking-wide">Harish Sarees</span>
          <span className="text-xs text-muted-foreground tracking-widest uppercase">Dharmavaram</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-body tracking-wide transition-colors hover:text-primary ${link.label === "Admin" ? "flex items-center gap-1 text-muted-foreground" : "text-foreground"}`}
            >
              {link.label === "Admin" && <User className="w-3.5 h-3.5" />}
              {link.label}
            </Link>
          ))}
          <Link to="/cart" className="relative text-foreground hover:text-primary transition-colors">
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-body">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-4">
          <Link to="/cart" className="relative text-foreground">
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-foreground">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-background border-b border-border animate-fade-in">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="text-foreground hover:text-primary font-body py-2 border-b border-border/50 last:border-0"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
