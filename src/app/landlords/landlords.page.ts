import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonIcon,
  IonInput, IonSelect, IonSelectOption, IonTextarea,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  cashOutline,
  shieldCheckmarkOutline,
  phonePortraitOutline,
  logoWhatsapp,
  checkmarkCircle,
} from 'ionicons/icons';

@Component({
  selector: 'app-landlords',
  templateUrl: 'landlords.page.html',
  styleUrls: ['landlords.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton, IonIcon,
    IonInput, IonSelect, IonSelectOption, IonTextarea,
    ReactiveFormsModule,
  ],
})
export class LandlordsPage {
  submitted = false;

  readonly benefits = [
    {
      icon: 'cash-outline',
      title: 'Earn More',
      text: "No broker taking a month's rent. Keep more of what your property earns.",
    },
    {
      icon: 'shield-checkmark-outline',
      title: 'Verified Renters',
      text: 'Every enquiry comes from a real person. No time wasters, no fake viewings.',
    },
    {
      icon: 'phone-portrait-outline',
      title: 'Manage Remotely',
      text: 'Diaspora landlord? Monitor bookings and earnings from anywhere in the world.',
    },
  ];

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    whatsapp: new FormControl('', [Validators.required]),
    area: new FormControl('', [Validators.required]),
    propertyType: new FormControl('', [Validators.required]),
    bedrooms: new FormControl('', [Validators.required]),
    notes: new FormControl(''),
  });

  constructor(private router: Router) {
    addIcons({ cashOutline, shieldCheckmarkOutline, phonePortraitOutline, logoWhatsapp, checkmarkCircle });
  }

  isInvalid(field: string): boolean {
    const c = this.form.get(field);
    return !!(c?.invalid && c?.touched);
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // TODO: POST to Rails API /api/v1/landlord_enquiries
    console.log('Landlord enquiry submitted:', this.form.value);
    this.submitted = true;
  }

  talkToPearlRidge() {
    const msg = encodeURIComponent(
      "Hi Pearl Ridge, I have a property in the Kyanja-Najjera-Ntinda corridor and I'm interested in your management service."
    );
    window.open(`https://wa.me/447718313166?text=${msg}`, '_blank');
  }

  goToBrowse() {
    this.router.navigate(['/browse']);
  }
}
