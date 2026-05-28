import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonSearchbar,
  IonCard, IonCardContent,
  IonChip, IonLabel,
  IonButton, IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  locationOutline, logoWhatsapp, searchOutline,
  wifiOutline, waterOutline, carOutline,
  shieldCheckmarkOutline, flashOutline,
  tvOutline, restaurantOutline, syncOutline,
  flaskOutline, checkmarkCircleOutline,
} from 'ionicons/icons';
import { Property, PropertyService } from '../services/property.service';

type CategoryFilter = 'all' | 'short-stay' | 'long-furnished' | 'unfurnished';
type SortOption = 'newest' | 'price-asc' | 'price-desc';

@Component({
  selector: 'app-browse',
  templateUrl: 'browse.page.html',
  styleUrls: ['browse.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonSearchbar,
    IonCard, IonCardContent,
    IonChip, IonLabel,
    IonButton, IonIcon,
    NgClass,
  ],
})
export class BrowsePage {
  searchText = '';
  activeCategory: CategoryFilter = 'all';
  activeArea = 'all';
  sortBy: SortOption = 'newest';

  readonly areas = ['all', 'Najjera', 'Kyanja', 'Ntinda', 'Kisaasi'];

  constructor(
    private router: Router,
    private propertyService: PropertyService,
  ) {
    addIcons({
      locationOutline, logoWhatsapp, searchOutline,
      wifiOutline, waterOutline, carOutline,
      shieldCheckmarkOutline, flashOutline,
      tvOutline, restaurantOutline, syncOutline,
      flaskOutline, checkmarkCircleOutline,
    });
  }

  get filteredProperties(): Property[] {
    const search = this.searchText.toLowerCase().trim();
    return this.propertyService.properties.filter((p) => {
      const matchesCategory =
        this.activeCategory === 'all' || p.category === this.activeCategory;
      const matchesArea =
        this.activeArea === 'all' || p.area === this.activeArea;
      const matchesSearch =
        !search ||
        p.title.toLowerCase().includes(search) ||
        p.location.toLowerCase().includes(search) ||
        p.area.toLowerCase().includes(search);
      return matchesCategory && matchesArea && matchesSearch;
    });
  }

  get sortedProperties(): Property[] {
    const list = [...this.filteredProperties];
    if (this.sortBy === 'price-asc') return list.sort((a, b) => a.price - b.price);
    if (this.sortBy === 'price-desc') return list.sort((a, b) => b.price - a.price);
    return list.reverse(); // newest first = reverse insertion order
  }

  setCategory(cat: CategoryFilter) {
    this.activeCategory = cat;
  }

  setArea(area: string) {
    this.activeArea = area;
  }

  onSearch(event: Event) {
    this.searchText = (event as CustomEvent).detail.value ?? '';
  }

  onSortChange(event: Event) {
    this.sortBy = (event.target as HTMLSelectElement).value as SortOption;
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
      'Smart TV': 'tv-outline',
      'Kitchen': 'restaurant-outline',
      'Washing Machine': 'sync-outline',
      'Water Tank': 'flask-outline',
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
