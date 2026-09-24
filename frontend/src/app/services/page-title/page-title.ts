import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PageTitle {
  
  currentPageTitle = '';

  setTitle(title: string) {
    this.currentPageTitle = title;
  }

  getTitle() {
    return this.currentPageTitle;
  }

}
