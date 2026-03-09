import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-heading text-xl font-bold mb-2">Harish Sarees</h3>
          <p className="text-sm opacity-80 font-body leading-relaxed">
            Dharmavaram Handmade Premium Silk Sarees for Every Occasion. Crafted with love and tradition since generations.
          </p>
        </div>
        <div>
          <h4 className="font-heading text-lg font-semibold mb-3">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm opacity-80">
            <Link to="/" className="hover:opacity-100 transition-opacity font-body">Home</Link>
            <Link to="/collection" className="hover:opacity-100 transition-opacity font-body">Collection</Link>
            <Link to="/about" className="hover:opacity-100 transition-opacity font-body">About Us</Link>
            <Link to="/contact" className="hover:opacity-100 transition-opacity font-body">Contact</Link>
          </div>
        </div>
        <div>
          <h4 className="font-heading text-lg font-semibold mb-3">Contact Us</h4>
          <div className="flex flex-col gap-2 text-sm opacity-80">
            <a href="tel:8867676906" className="flex items-center gap-2 hover:opacity-100 font-body">
              <Phone className="w-4 h-4" /> 8867676906
            </a>
            <a href="mailto:vihan.vasusen@gmail.com" className="flex items-center gap-2 hover:opacity-100 font-body">
              <Mail className="w-4 h-4" /> vihan.vasusen@gmail.com
            </a>
            <p className="flex items-start gap-2 font-body">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0" /> Dharmavaram, Andhra Pradesh, India
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-sm opacity-60 font-body">
        © {new Date().getFullYear()} Harish Sarees. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
