import { Component } from '@angular/core';
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
  private authService = inject(Auth);
  private supabaseService = inject(Supabase);
  currentUser$ = this.supabaseService.currentUser$

  toastMessage = '';
  private data = inject(Data);
  currentFilter: string = filtros.tudo;

  history = this.data.getHistory;
  documents = this.data.getDocuments;
  documentsColor = documentTypeColor;

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
