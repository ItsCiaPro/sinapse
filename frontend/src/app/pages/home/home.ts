import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth/auth';
import { inject } from '@angular/core';
import { Supabase } from '../../services/supabase';
import { AsyncPipe, KeyValuePipe } from '@angular/common';
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
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  @ViewChild('documentCarousel') documentCarousel?: ElementRef<HTMLElement>;
  private authService = inject(Auth);
  private supabaseService = inject(Supabase);
  currentUser$ = this.supabaseService.currentUser$

  toastMessage = '';
  private data = inject(Data);
  currentFilter: string = filtros.tudo;

  history = this.data.getHistory;
  documents = this.data.getDocuments;
  documentsColor = documentTypeColor;
  currentDocumentIndex = 0;

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
