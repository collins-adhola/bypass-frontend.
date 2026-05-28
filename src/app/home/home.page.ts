import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardContent,
  IonChip, IonLabel,
  IonButton, IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  locationOutline, logoWhatsapp,
  wifiOutline, waterOutline, carOutline,
  shieldCheckmarkOutline, flashOutline, checkmarkCircleOutline,
} from 'ionicons/icons';

interface Property {
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

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonCard, IonCardContent,
    IonChip, IonLabel,
    IonButton, IonIcon,
    NgClass, RouterLink,
  ],
})
export class HomePage {
  activeFilter: 'all' | 'short-stay' | 'long-furnished' | 'unfurnished' = 'all';

  properties: Property[] = [
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
      description: 'Fully furnished luxury apartment in Najjera. Open-plan living, master en-suite, marble floors, cove lighting, fitted wardrobes, fully equipped kitchen. Pool and 24/7 backup power included. Managed by Pearl Ridge.',
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

  constructor() {
    addIcons({
      locationOutline, logoWhatsapp,
      wifiOutline, waterOutline, carOutline,
      shieldCheckmarkOutline, flashOutline, checkmarkCircleOutline,
    });
  }

  get filteredProperties(): Property[] {
    if (this.activeFilter === 'all') return this.properties;
    return this.properties.filter((p) => p.category === this.activeFilter);
  }

  setFilter(filter: 'all' | 'short-stay' | 'long-furnished' | 'unfurnished') {
    this.activeFilter = filter;
  }

  badgeLabel(category: string): string {
    const labels: Record<string, string> = {
      'short-stay': 'Short Stay',
      'long-furnished': 'Long Stay',
      'unfurnished': 'Unfurnished',
    };
    return labels[category] ?? category;
  }

  amenityIcon(amenity: string): string {
    const icons: Record<string, string> = {
      'WiFi': 'wifi-outline',
      'Pool': 'water-outline',
      'Parking': 'car-outline',
      'Security': 'shield-checkmark-outline',
      'Backup Power': 'flash-outline',
    };
    return icons[amenity] ?? 'checkmark-circle-outline';
  }

  formatPrice(p: Property): string {
    const sym = p.currency === 'USD' ? '$' : 'UGX ';
    return `${sym}${p.price.toLocaleString()}`;
  }

  openWhatsApp(number: string) {
    window.open(`https://wa.me/${number}`, '_blank');
  }
}
