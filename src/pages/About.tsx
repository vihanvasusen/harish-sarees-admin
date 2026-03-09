const About = () => (
  <div className="container mx-auto px-4 py-12">
    <div className="max-w-3xl mx-auto">
      <h1 className="font-heading text-4xl font-bold text-foreground mb-8 text-center">About Harish Sarees</h1>
      
      <div className="prose prose-lg max-w-none">
        <div className="bg-card rounded-lg p-8 border border-border mb-8">
          <h2 className="font-heading text-2xl font-semibold text-primary mb-4">Our Heritage</h2>
          <p className="text-muted-foreground font-body leading-relaxed mb-4">
            Based in the heart of Dharmavaram, Andhra Pradesh — renowned as the silk city of South India — Harish Sarees 
            carries forward a proud legacy of handloom weaving. Our sarees are meticulously handcrafted by skilled artisans 
            who have inherited this art through generations.
          </p>
          <p className="text-muted-foreground font-body leading-relaxed">
            Every thread tells a story of dedication, every motif speaks of tradition, and every saree is a masterpiece 
            that celebrates the timeless beauty of Indian silk.
          </p>
        </div>

        <div className="bg-card rounded-lg p-8 border border-border mb-8">
          <h2 className="font-heading text-2xl font-semibold text-primary mb-4">What Sets Us Apart</h2>
          <ul className="space-y-3 text-muted-foreground font-body">
            <li className="flex items-start gap-2"><span className="text-accent font-bold">✦</span> 100% pure silk with authentic zari work</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold">✦</span> Handwoven by master artisans of Dharmavaram</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold">✦</span> Direct from loom — no middlemen, fair prices</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold">✦</span> Pan-India delivery with careful packaging</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold">✦</span> Personalized assistance via WhatsApp</li>
          </ul>
        </div>

        <div className="bg-gradient-maroon text-primary-foreground rounded-lg p-8 text-center">
          <h2 className="font-heading text-2xl font-bold mb-2">Visit Our Store</h2>
          <p className="font-body opacity-90 mb-1">Dharmavaram, Andhra Pradesh, India</p>
          <p className="font-body opacity-80 text-sm">Open all days • 10 AM – 8 PM</p>
        </div>
      </div>
    </div>
  </div>
);

export default About;
