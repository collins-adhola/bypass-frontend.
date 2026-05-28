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
      whatsapp: '447718313166',
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
      whatsapp: '447718313166',
      description: 'Spacious 2-bedroom furnished apartment in Bukoto.',
    },
    {
      id: 3,
      title: '2 Bedroom Apartment',
      location: 'Kyanja, Kampala',
      area: 'Kyanja',
      category: 'unfurnished',
      bedrooms: 2,
      bathrooms: 1,
      price: 900000,
      currency: 'UGX',
      period: 'month',
      amenities: ['Parking', 'Security', 'Water Tank'],
      images: [
        'https://picsum.photos/seed/kyanja3/800/500',
      ],
      available: true,
      managed: false,
      whatsapp: '447718313166',
      description: 'Spacious unfurnished 2 bedroom apartment in Kyanja. Tiled throughout, secure compound, reliable water supply. No broker — contact landlord directly.',
    },
    {
      id: 4,
      title: '1 Bedroom Furnished Apartment',
      location: 'Ntinda, Kampala',
      area: 'Ntinda',
      category: 'long-furnished',
      bedrooms: 1,
      bathrooms: 1,
      price: 600,
      currency: 'USD',
      period: 'month',
      amenities: ['WiFi', 'Security', 'Backup Power', 'Parking'],
      images: [
        'https://picsum.photos/seed/ntinda4/800/500',
      ],
      available: true,
      managed: true,
      whatsapp: '447718313166',
      description: 'Modern fully furnished 1 bedroom apartment in Ntinda. Ideal for professionals and expats. Managed by Pearl Ridge Properties.',
    },
    {
      id: 5,
      title: '2 Bedroom Apartment',
      location: 'Najjera, Kampala',
      area: 'Najjera',
      category: 'unfurnished',
      bedrooms: 2,
      bathrooms: 1,
      price: 2000000,
      currency: 'UGX',
      period: 'month',
      amenities: ['Kitchen', 'Backup Power', 'Parking', 'Security'],
      images: [
        'assets/properties/Najerra_unfurnished/Najerra_unfurnished2.jpeg',
        'assets/properties/Najerra_unfurnished/Najerra_unfurnished3.jpeg',
        'assets/properties/Najerra_unfurnished/Najerra_unfurnished1.jpeg',
      ],
      available: true,
      managed: false,
      whatsapp: '447718313166',
      description: 'Brand new unfurnished apartment in Najjera with premium finishes. Fitted dark-wood kitchen with teal tile splashback and under-cabinet lighting, luxury bathroom with walk-in shower and bath, hardwood floors throughout, and floor-to-ceiling balcony doors. No broker — contact landlord directly.',
    },
  ];

  getById(id: number): Property | undefined {
    return this.properties.find((p) => p.id === id);
  }
}
