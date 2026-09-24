import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth/auth';
import { inject } from '@angular/core';
import { Supabase } from '../../services/supabase';
import { AsyncPipe, DatePipe, KeyValuePipe } from '@angular/common';
import QRCode from 'qrcode';
import { DemoAccess, DemoShare } from '../../services/demo-share';
import { RouterLink } from '@angular/router';
import { filtros } from '../../models/enums/filters';
import { Data } from '../../models/data/data';
import { documentTypeColor } from '../../models/enums/document-enums';

@Component({
  selector: 'app-home',
  imports: [
    FormsModule,
    AsyncPipe,
    RouterLink,
    KeyValuePipe,
    DatePipe,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {
  @ViewChild('documentCarousel') documentCarousel?: ElementRef<HTMLElement>;
  private authService = inject(Auth);
  private supabaseService = inject(Supabase);
  currentUser$ = this.supabaseService.currentUser$

  toastMessage = '';
  private data = inject(Data);
  private demoShare = inject(DemoShare);
  activeAccess: DemoAccess | null = null;
  qrImage = '';
  copiedLink = false;
  copyError = false;
  private expiryTimer?: ReturnType<typeof setInterval>;
  currentFilter: string = filtros.tudo;

  history = this.data.getHistory;
  documents = this.data.getDocuments;
  documentsColor = documentTypeColor;
  currentDocumentIndex = 0;

  async ngOnInit(): Promise<void> {
    this.activeAccess = this.demoShare.getActive();
    if (this.activeAccess) this.qrImage = await QRCode.toDataURL(this.activeAccess.url, { width: 180, margin: 2 });
    this.expiryTimer = setInterval(() => {
      if (!this.demoShare.getActive()) { this.activeAccess = null; this.qrImage = ''; }
    }, 30000);
  }

  ngOnDestroy(): void { if (this.expiryTimer) clearInterval(this.expiryTimer); }

  async copyActiveLink(): Promise<void> {
    if (!this.activeAccess) return;
    try {
      await navigator.clipboard.writeText(this.activeAccess.url);
      this.copiedLink = true;
      this.copyError = false;
    } catch { this.copyError = true; }
  }

  showDocument(index: number): void {
    const carousel = this.documentCarousel?.nativeElement;
    if (!carousel || index < 0 || index >= this.documents.length) return;

    const cards = carousel.querySelectorAll<HTMLElement>('.item');
    const first = cards[0];
    const card = cards[index];
    if (!first || !card) return;

    this.currentDocumentIndex = index;
    carousel.scrollTo({ left: card.offsetLeft - first.offsetLeft, behavior: 'smooth' });
  }

  syncDocumentIndex(): void {
    const carousel = this.documentCarousel?.nativeElement;
    if (!carousel) return;

    const cards = carousel.querySelectorAll<HTMLElement>('.item');
    const first = cards[0];
    if (!first) return;

    let nearestIndex = 0;
    let nearestDistance = Infinity;
    cards.forEach((card, index) => {
      const distance = Math.abs(card.offsetLeft - first.offsetLeft - carousel.scrollLeft);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });
    this.currentDocumentIndex = nearestIndex;
  }

  onCarouselArrow(event: Event, direction: number): void {
    event.preventDefault();
    this.showDocument(this.currentDocumentIndex + direction);
  }

  expandedIndexes = new Set<number>();

  toggleDetails(index: number): void {
    if (this.expandedIndexes.has(index)) {
      this.expandedIndexes.delete(index);
    } else {
      this.expandedIndexes.add(index);
    }
  }

  isExpanded(index: number): boolean {
    return this.expandedIndexes.has(index);
  }

  async onLogout() {
    console.log('ok');

    try {

      const { successMessage, errorMessage } = await this.authService.logOut();

      if (errorMessage) {
        this.toastMessage = errorMessage ?? '';
      } else {
        this.toastMessage = successMessage ?? '';
      }
    }

    finally {
      console.log(this.toastMessage);
    }
  }
}
