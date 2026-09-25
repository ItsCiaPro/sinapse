import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import QRCode from 'qrcode';
import { DemoAccess, DemoShare } from '../../services/demo-share';

@Component({
  selector: 'app-share',
  imports: [FormsModule, DatePipe],
  templateUrl: './share.html',
  styleUrl: './share.css',
})
export class Share implements OnInit, OnDestroy {
  private demoShare = inject(DemoShare);
  activeAccess: DemoAccess | null = null;
  qrImage = '';
  historyEnabled = true;
  examsEnabled = false;
  prescriptionsEnabled = false;
  durationHours = 24;
  copied = false;
  copyError = false;
  private expiryTimer?: ReturnType<typeof setInterval>;

  async ngOnInit(): Promise<void> {
    this.activeAccess = this.demoShare.getActive();
    if (this.activeAccess) await this.renderQr(this.activeAccess.url);
    this.expiryTimer = setInterval(() => {
      if (!this.demoShare.getActive()) { this.activeAccess = null; this.qrImage = ''; }
    }, 30000);
  }

  ngOnDestroy(): void { if (this.expiryTimer) clearInterval(this.expiryTimer); }

  async generate(): Promise<void> {
    const scopes = [
      ...(this.historyEnabled ? ['historico'] : []),
      ...(this.examsEnabled ? ['exames'] : []),
      ...(this.prescriptionsEnabled ? ['prescricoes'] : []),
    ];
    if (!scopes.length) return;
    this.activeAccess = this.demoShare.generate(this.durationHours, scopes);
    this.copied = false;
    await this.renderQr(this.activeAccess.url);
  }

  async copyLink(): Promise<void> {
    if (!this.activeAccess) return;
    try {
      await navigator.clipboard.writeText(this.activeAccess.url);
      this.copied = true;
      this.copyError = false;
    } catch { this.copyError = true; }
  }

  private async renderQr(url: string): Promise<void> {
    this.qrImage = await QRCode.toDataURL(url, { width: 220, margin: 2, errorCorrectionLevel: 'M' });
  }
}
