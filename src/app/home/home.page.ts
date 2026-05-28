import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
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
import { Property, PropertyService } from '../services/property.service';

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

  constructor(
    private router: Router,
    private propertyService: PropertyService,
  ) {
    addIcons({
      locationOutline, logoWhatsapp,
      wifiOutline, waterOutline, carOutline,
      shieldCheckmarkOutline, flashOutline, checkmarkCircleOutline,
    });
  }

  get filteredProperties(): Property[] {
    const all = this.propertyService.properties;
    if (this.activeFilter === 'all') return all;
    return all.filter((p) => p.category === this.activeFilter);
  }

  setFilter(filter: 'all' | 'short-stay' | 'long-furnished' | 'unfurnished') {
    this.activeFilter = filter;
  }

  viewProperty(id: number) {
    this.router.navigate(['/property', id]);
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

  openWhatsApp(event: Event, number: string) {
    event.stopPropagation();
    window.open(`https://wa.me/${number}`, '_blank');
  }
}
