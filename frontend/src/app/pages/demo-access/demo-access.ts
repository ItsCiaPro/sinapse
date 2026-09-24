import { DatePipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({ selector: 'app-demo-access', imports: [DatePipe], templateUrl: './demo-access.html', styleUrl: './demo-access.css' })
export class DemoAccessPage implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  expiresAt = Number(this.route.snapshot.queryParamMap.get('ate'));
  scopes = (this.route.snapshot.queryParamMap.get('itens') || '').split(',');
  valid = Number.isFinite(this.expiresAt) && this.expiresAt > Date.now();
  private expiryTimer?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.expiryTimer = setInterval(() => { this.valid = this.expiresAt > Date.now(); }, 30000);
  }

  ngOnDestroy(): void { if (this.expiryTimer) clearInterval(this.expiryTimer); }
}
