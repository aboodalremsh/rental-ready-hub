import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, MapPin, Bed, Bath, ArrowRight, Building2, Home, Briefcase, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";

const featuredProperties = [
  { id: "1", title: "Luxury Downtown Penthouse", city: "New York", price: 8500, bedrooms: 4, bathrooms: 3, image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800", type: "penthouse" },
  { id: "2", title: "Modern Waterfront Studio", city: "San Francisco", price: 2800, bedrooms: 1, bathrooms: 1, image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800", type: "studio" },
  { id: "3", title: "Executive Office Suite", city: "Chicago", price: 5500, bedrooms: 0, bathrooms: 2, image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800", type: "office" },
];

const stats = [
  { value: "2,500+", label: "Properties Listed" },
  { value: "15K+", label: "Happy Tenants" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "24/7", label: "Support Available" },
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920"
            alt="Luxury property"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/60" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-accent/20 text-accent text-sm font-medium mb-6">
              Find Your Perfect Space
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
              Discover Your Dream <span className="text-accent">Rental</span> Property
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-xl">
              Browse thousands of premium apartments and offices. Your perfect space is just a click away.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/properties">
                <Button variant="hero" size="xl">
                  Explore Properties
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="hero-outline" size="xl">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Properties</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Handpicked premium listings for discerning renters
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property, i) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-medium transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-accent text-accent-foreground text-sm font-medium capitalize">
                    {property.type}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                    <MapPin className="h-4 w-4" />
                    {property.city}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors">
                    {property.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    {property.bedrooms > 0 && (
                      <span className="flex items-center gap-1"><Bed className="h-4 w-4" /> {property.bedrooms} Beds</span>
                    )}
                    <span className="flex items-center gap-1"><Bath className="h-4 w-4" /> {property.bathrooms} Baths</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">${property.price.toLocaleString()}<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                    <Link to={`/property/${property.id}`}>
                      <Button variant="outline" size="sm">View Details</Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/properties">
              <Button variant="gold" size="lg">
                View All Properties
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Find Your Perfect Space?
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Join thousands of satisfied tenants who found their dream rental through RentEase.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/auth?mode=signup">
              <Button variant="hero" size="xl">Get Started Today</Button>
            </Link>
            <Link to="/contact">
              <Button variant="hero-outline" size="xl">Talk to an Expert</Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
