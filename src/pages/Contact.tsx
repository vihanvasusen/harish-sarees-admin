import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

const Contact = () => (
  <div className="container mx-auto px-4 py-12">
    <div className="max-w-3xl mx-auto">
      <h1 className="font-heading text-4xl font-bold text-foreground mb-3 text-center">Contact Us</h1>
      <p className="text-muted-foreground font-body text-center mb-10">We'd love to hear from you</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <a href="tel:8867676906" className="bg-card border border-border rounded-lg p-6 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Phone className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-foreground">Phone</h3>
            <p className="text-muted-foreground font-body text-sm">8867676906</p>
          </div>
        </a>

        <a href="mailto:vihan.vasusen@gmail.com" className="bg-card border border-border rounded-lg p-6 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Mail className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-foreground">Email</h3>
            <p className="text-muted-foreground font-body text-sm">vihan.vasusen@gmail.com</p>
          </div>
        </a>

        <a href="https://wa.me/918867676906" target="_blank" rel="noopener noreferrer" className="bg-card border border-border rounded-lg p-6 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0">
            <MessageCircle className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-foreground">WhatsApp</h3>
            <p className="text-muted-foreground font-body text-sm">Chat with us instantly</p>
          </div>
        </a>

        <div className="bg-card border border-border rounded-lg p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-foreground">Location</h3>
            <p className="text-muted-foreground font-body text-sm">Dharmavaram, Andhra Pradesh, India</p>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <h2 className="font-heading text-2xl font-semibold text-foreground mb-3">Prefer WhatsApp?</h2>
        <p className="text-muted-foreground font-body mb-6">
          Most of our customers reach us on WhatsApp for quick enquiries, orders, and personalized recommendations.
        </p>
        <a
          href="https://wa.me/918867676906?text=Hi%2C%20I%27m%20interested%20in%20your%20sarees"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-md font-body font-semibold hover:opacity-90 transition-opacity"
        >
          Start WhatsApp Chat
        </a>
      </div>
    </div>
  </div>
);

export default Contact;
