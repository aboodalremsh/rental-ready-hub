import { motion } from "framer-motion";
import { Target, Users, Award, Heart } from "lucide-react";
import { Layout } from "@/components/layout/Layout";

const values = [
  { icon: Target, title: "Our Mission", description: "To simplify the rental process and connect people with their perfect spaces through innovative technology and exceptional service." },
  { icon: Users, title: "Customer First", description: "Every decision we make is driven by our commitment to providing the best possible experience for our users." },
  { icon: Award, title: "Excellence", description: "We strive for excellence in everything we do, from property listings to customer support." },
  { icon: Heart, title: "Trust & Integrity", description: "We build lasting relationships based on transparency, honesty, and mutual respect." },
];

const team = [
  { name: "Sarah Johnson", role: "CEO & Founder", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400" },
  { name: "Michael Chen", role: "Head of Operations", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400" },
  { name: "Emily Rodriguez", role: "Lead Designer", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400" },
  { name: "David Kim", role: "Tech Lead", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" },
];

export default function About() {
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
            About RentEase
          </motion.h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            We're on a mission to transform the rental experience
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                Founded in 2020, RentEase was born from a simple frustration: finding a rental property was way too complicated. Our founders, having experienced the pain of endless property searches and confusing paperwork, decided to build something better.
              </p>
              <p className="text-muted-foreground mb-4">
                Today, we've helped over 15,000 tenants find their perfect homes and connected thousands of property owners with quality renters. Our platform combines cutting-edge technology with a human touch to make renting simple, transparent, and stress-free.
              </p>
              <p className="text-muted-foreground">
                Whether you're looking for a cozy studio in the city or a spacious office for your growing team, RentEase is here to help you every step of the way.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800"
                alt="Our office"
                className="rounded-2xl shadow-card"
              />
              <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground p-6 rounded-2xl shadow-glow">
                <div className="text-4xl font-bold">5+</div>
                <div className="text-sm">Years of Excellence</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The passionate people behind RentEase
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="relative mb-4 overflow-hidden rounded-2xl">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-muted-foreground text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
