import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { filtros } from '../../models/enums/filters';
import { Data, RecordDraft } from '../../models/data/data';

@Component({
  selector: 'app-history',
  imports: [FormsModule],
  templateUrl: './history.html',
  styleUrl: './history.css',
})
export class History {
  @ViewChild('recordDialog') recordDialog?: ElementRef<HTMLDialogElement>;
  private data = inject(Data);
  currentFilter: string = filtros.tudo;
  filters = filtros;
  history = this.data.getHistory;
  today = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`;
  attachment?: File;
  draft: RecordDraft = this.emptyDraft();

  count(type: filtros): number { return this.history.filter(record => record.type === type).length; }

  openForm(mode: 'result' | 'appointment' = 'result'): void {
    this.draft = this.emptyDraft();
    this.draft.mode = mode;
    this.draft.type = mode === 'appointment' ? filtros.consulta : filtros.exame;
    this.attachment = undefined;
    this.recordDialog?.nativeElement.showModal();
  }

  onFileSelected(event: Event): void {
    this.attachment = (event.target as HTMLInputElement).files?.[0];
  }

  saveRecord(): void {
    if (!this.draft.title.trim() || !this.draft.clinician.trim() || !this.draft.location.trim() || !this.draft.date ||
        (this.draft.mode === 'appointment' && (!this.draft.time || this.draft.type === filtros.prescricao))) return;
    this.data.addRecord(this.draft, this.attachment);
    this.currentFilter = filtros.tudo;
    this.recordDialog?.nativeElement.close();
  }

  private emptyDraft(): RecordDraft {
    return { mode: 'result', type: filtros.exame, title: '', clinician: '', location: '', date: '', time: '', result: '', observations: '' };
  }
}
