import { motion } from "framer-motion";
import { Search, Shield, Clock, Headphones, FileText, Key, Home, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";

const services = [
  { icon: Search, title: "Property Search", description: "Advanced search filters to find your perfect rental property in seconds. Filter by location, price, amenities, and more." },
  { icon: Shield, title: "Verified Listings", description: "All our properties are thoroughly verified to ensure accuracy and prevent fraud. Rent with confidence." },
  { icon: Clock, title: "Quick Process", description: "From search to signing, our streamlined process gets you into your new space faster than ever." },
  { icon: Headphones, title: "24/7 Support", description: "Our dedicated support team is available around the clock to help with any questions or issues." },
  { icon: FileText, title: "Digital Contracts", description: "Sign lease agreements digitally from anywhere. Secure, legal, and environmentally friendly." },
  { icon: Key, title: "Easy Move-In", description: "Seamless key handover and move-in coordination. We make transitions smooth and stress-free." },
];

const forRenters = [
  "Access to thousands of verified properties",
  "Personalized property recommendations",
  "Secure online payments",
  "24/7 maintenance request system",
  "Digital lease management",
];

const forOwners = [
  "Professional property listings",
  "Tenant screening and verification",
  "Automated rent collection",
  "Property management dashboard",
  "Legal document templates",
];

export default function Services() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4"
          >
            Our Services
          </motion.h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Everything you need for a seamless rental experience
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-card p-8 rounded-2xl shadow-card hover:shadow-medium transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                  <service.icon className="h-7 w-7 text-accent group-hover:text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* For Renters & Owners */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* For Renters */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-background p-8 rounded-2xl shadow-card"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                  <Home className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="text-2xl font-bold">For Renters</h3>
              </div>
              <ul className="space-y-4">
                {forRenters.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/properties" className="mt-8 inline-block">
                <Button variant="gold">Browse Properties</Button>
              </Link>
            </motion.div>

            {/* For Owners */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-background p-8 rounded-2xl shadow-card"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold">For Property Owners</h3>
              </div>
              <ul className="space-y-4">
                {forOwners.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="mt-8 inline-block">
                <Button>List Your Property</Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Join thousands of satisfied users who trust RentEase for their rental needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/auth?mode=signup">
              <Button variant="hero" size="xl">Create Free Account</Button>
            </Link>
            <Link to="/contact">
              <Button variant="hero-outline" size="xl">Contact Sales</Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
