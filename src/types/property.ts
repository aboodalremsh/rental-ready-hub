export type PropertyType = 'apartment' | 'office' | 'studio' | 'penthouse' | 'commercial';
export type PropertyStatus = 'available' | 'rented' | 'maintenance';
export type RentalStatus = 'pending' | 'approved' | 'rejected' | 'completed';

export interface Property {
  id: string;
  title: string;
  description: string | null;
  property_type: PropertyType;
  status: PropertyStatus;
  price: number;
  bedrooms: number | null;
  bathrooms: number | null;
  area_sqft: number | null;
  address: string;
  city: string;
  state: string | null;
  zip_code: string | null;
  country: string | null;
  latitude: number | null;
  longitude: number | null;
  amenities: string[] | null;
  images: string[] | null;
  featured: boolean | null;
  created_at: string;
  updated_at: string;
}

export interface Rental {
  id: string;
  property_id: string;
  user_id: string;
  start_date: string;
  end_date: string;
  status: RentalStatus;
  total_amount: number | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  created_at: string;
}
