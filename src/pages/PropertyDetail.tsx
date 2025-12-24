import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Bed, Bath, Ruler, Calendar, ArrowLeft, Check, Heart } from "lucide-react";
import { format, addMonths } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Layout } from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import type { Property } from "@/types/property";

export default function PropertyDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [showRentalForm, setShowRentalForm] = useState(false);
  const [rentalData, setRentalData] = useState({
    startDate: format(new Date(), "yyyy-MM-dd"),
    endDate: format(addMonths(new Date(), 12), "yyyy-MM-dd"),
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    if (!id) return;
    const { data, error } = await supabase.from("properties").select("*").eq("id", id).single();
    if (!error && data) setProperty(data as Property);
    setLoading(false);
  };

  const handleRentalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({ title: "Please sign in", description: "You need to be logged in to rent a property.", variant: "destructive" });
      return;
    }
    if (!property) return;

    setSubmitting(true);
    const { error } = await supabase.from("rentals").insert([{
      property_id: property.id,
      user_id: user.id,
      start_date: rentalData.startDate,
      end_date: rentalData.endDate,
      notes: rentalData.notes,
      total_amount: property.price * 12,
    }]);

    if (error) {
      toast({ title: "Error", description: "Failed to submit rental request.", variant: "destructive" });
    } else {
      toast({ title: "Request Submitted!", description: "We'll review your application and get back to you soon." });
      setShowRentalForm(false);
    }
    setSubmitting(false);
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20">
          <div className="animate-pulse space-y-8">
            <div className="h-[500px] bg-muted rounded-2xl" />
            <div className="h-8 bg-muted rounded w-1/2" />
            <div className="h-4 bg-muted rounded w-1/4" />
          </div>
        </div>
      </Layout>
    );
  }

  if (!property) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Property Not Found</h1>
          <Link to="/properties"><Button>Browse Properties</Button></Link>
        </div>
      </Layout>
    );
  }

  const images = property.images || ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Link to="/properties" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Properties
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Images & Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Image */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative rounded-2xl overflow-hidden">
              <img src={images[activeImage]} alt={property.title} className="w-full h-[500px] object-cover" />
              <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-accent text-accent-foreground font-medium capitalize">
                {property.property_type}
              </div>
            </motion.div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImage(i)} className={`shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${activeImage === i ? "border-accent" : "border-transparent opacity-70 hover:opacity-100"}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Property Info */}
            <div className="bg-card p-8 rounded-2xl shadow-card">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <MapPin className="h-4 w-4" />
                {property.address}, {property.city}, {property.state} {property.zip_code}
              </div>
              <h1 className="text-3xl font-bold mb-4">{property.title}</h1>

              <div className="flex flex-wrap gap-6 mb-6 text-sm">
                {property.bedrooms && property.bedrooms > 0 && (
                  <span className="flex items-center gap-2"><Bed className="h-5 w-5 text-accent" /> {property.bedrooms} Bedrooms</span>
                )}
                {property.bathrooms && (
                  <span className="flex items-center gap-2"><Bath className="h-5 w-5 text-accent" /> {property.bathrooms} Bathrooms</span>
                )}
                {property.area_sqft && (
                  <span className="flex items-center gap-2"><Ruler className="h-5 w-5 text-accent" /> {property.area_sqft.toLocaleString()} sqft</span>
                )}
              </div>

              <p className="text-muted-foreground mb-6">{property.description}</p>

              {/* Amenities */}
              {property.amenities && property.amenities.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3">Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-accent" /> {amenity}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Card */}
            <div className="bg-card p-6 rounded-2xl shadow-card sticky top-28">
              <div className="text-3xl font-bold mb-1">${property.price.toLocaleString()}<span className="text-lg font-normal text-muted-foreground">/month</span></div>
              <p className="text-muted-foreground text-sm mb-6">Available Now</p>

              {!showRentalForm ? (
                <div className="space-y-3">
                  <Button variant="gold" size="lg" className="w-full" onClick={() => setShowRentalForm(true)}>
                    Apply to Rent
                  </Button>
                  <Button variant="outline" size="lg" className="w-full">
                    <Heart className="h-4 w-4 mr-2" /> Save Property
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleRentalSubmit} className="space-y-4">
                  <div>
                    <Label>Move-in Date</Label>
                    <Input type="date" value={rentalData.startDate} onChange={(e) => setRentalData({ ...rentalData, startDate: e.target.value })} />
                  </div>
                  <div>
                    <Label>Lease End Date</Label>
                    <Input type="date" value={rentalData.endDate} onChange={(e) => setRentalData({ ...rentalData, endDate: e.target.value })} />
                  </div>
                  <div>
                    <Label>Additional Notes</Label>
                    <Textarea placeholder="Tell us about yourself..." value={rentalData.notes} onChange={(e) => setRentalData({ ...rentalData, notes: e.target.value })} />
                  </div>
                  <Button type="submit" variant="gold" size="lg" className="w-full" disabled={submitting}>
                    {submitting ? "Submitting..." : "Submit Application"}
                  </Button>
                  <Button type="button" variant="outline" size="lg" className="w-full" onClick={() => setShowRentalForm(false)}>
                    Cancel
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}