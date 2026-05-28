import { Injectable } from '@angular/core';

export interface Property {
  id: number;
  title: string;
  location: string;
  area: string;
  category: 'short-stay' | 'long-furnished' | 'unfurnished';
  bedrooms: number;
  bathrooms: number;
  price: number;
  currency: 'USD' | 'UGX';
  period: 'night' | 'week' | 'month';
  amenities: string[];
  images: string[];
  available: boolean;
  availableFrom?: string;
  managed: boolean;
  whatsapp: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class PropertyService {
  readonly properties: Property[] = [
    {
      id: 1,
      title: '3 Bedroom Luxury Apartment',
      location: 'Najjera, Kampala',
      area: 'Najjera',
      category: 'short-stay',
      bedrooms: 3,
      bathrooms: 2,
      price: 120,
      currency: 'USD',
      period: 'night',
      amenities: ['WiFi', 'Pool', 'Backup Power', 'Parking', 'Security', 'Smart TV', 'Kitchen', 'Washing Machine'],
      images: [
        'assets/properties/najjera-3bed/living-room-1.jpg',
        'assets/properties/najjera-3bed/living-room-2.jpg',
        'assets/properties/najjera-3bed/master-bedroom.jpg',
        'assets/properties/najjera-3bed/bedroom-2.jpg',
        'assets/properties/najjera-3bed/bedroom-wardrobe.jpg',
        'assets/properties/najjera-3bed/bedroom-3.jpg',
        'assets/properties/najjera-3bed/overview.jpg',
      ],
      available: true,
      availableFrom: 'July 2026',
      managed: true,
      whatsapp: '256700000001',
      description: 'Fully furnished luxury apartment in Najjera. Open-plan living, master en-suite, marble floors, cove lighting, fitted wardrobes, fully equipped kitchen. Pool and 24/7 backup power included. Managed by Pearl Ridge Properties.',
    },
    {
      id: 2,
      title: '2-Bed Furnished Apartment',
      location: 'Bukoto, Kampala',
      area: 'Bukoto',
      category: 'long-furnished',
      bedrooms: 2,
      bathrooms: 1,
      price: 800,
      currency: 'USD',
      period: 'month',
      amenities: ['Parking', 'Security', 'Backup Power'],
      images: [
        'https://picsum.photos/seed/bukoto2/800/500',
      ],
      available: true,
      managed: false,
      whatsapp: '256700000002',
      description: 'Spacious 2-bedroom furnished apartment in Bukoto.',
    },
  ];

  getById(id: number): Property | undefined {
    return this.properties.find((p) => p.id === id);
  }
}
