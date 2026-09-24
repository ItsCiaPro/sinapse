import { Component, inject } from '@angular/core';
import { filtros } from '../../models/enums/filters';
import { Data } from '../../models/data/data';

@Component({
  selector: 'app-history',
  imports: [],
  templateUrl: './history.html',
  styleUrl: './history.css',
})
export class History {
  private data = inject(Data);
  currentFilter: string = filtros.tudo;

  history = this.data.getHistory;
}
