import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgClass } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { IonContent, IonIcon, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  chevronBackOutline,
  locationOutline,
  wifiOutline,
  waterOutline,
  carOutline,
  shieldCheckmarkOutline,
  flashOutline,
  tvOutline,
  restaurantOutline,
  syncOutline,
  checkmarkCircleOutline,
  logoWhatsapp,
  callOutline,
} from 'ionicons/icons';
import { Property, PropertyService } from '../services/property.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: 'property-detail.page.html',
  styleUrls: ['property-detail.page.scss'],
  host: { class: 'ion-page' },
  imports: [IonContent, IonIcon, IonButton, NgClass],
})
export class PropertyDetailPage implements OnInit {
  @ViewChild('gallery') galleryRef!: ElementRef<HTMLDivElement>;

  property!: Property;
  currentImageIndex = 0;
  descriptionExpanded = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private propertyService: PropertyService,
  ) {
    addIcons({
      chevronBackOutline,
      locationOutline,
      wifiOutline,
      waterOutline,
      carOutline,
      shieldCheckmarkOutline,
      flashOutline,
      tvOutline,
      restaurantOutline,
      syncOutline,
      checkmarkCircleOutline,
      logoWhatsapp,
      callOutline,
    });
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const found = this.propertyService.getById(id);
    if (found) this.property = found;
  }

  onGalleryScroll(event: Event) {
    const el = event.target as HTMLDivElement;
    this.currentImageIndex = Math.round(el.scrollLeft / el.offsetWidth);
  }

  goBack() {
    this.location.back();
  }

  get isLongDescription(): boolean {
    return this.property?.description.length > 120;
  }

  get displayDescription(): string {
    if (this.descriptionExpanded || !this.isLongDescription) return this.property.description;
    return this.property.description.slice(0, 120) + '…';
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
    };
    return icons[amenity] ?? 'checkmark-circle-outline';
  }

  formatPrice(): string {
    const sym = this.property.currency === 'USD' ? '$' : 'UGX ';
    return `${sym}${this.property.price.toLocaleString()}`;
  }

  openWhatsApp() {
    const text = encodeURIComponent(
      `Hi, I found your property on ByPass and I'm interested in the ${this.property.title} in ${this.property.location}. Could you share more details?`
    );
    window.open(`https://wa.me/${this.property.whatsapp}?text=${text}`, '_blank');
  }

  call() {
    window.open(`tel:+${this.property.whatsapp}`, '_self');
  }
}
