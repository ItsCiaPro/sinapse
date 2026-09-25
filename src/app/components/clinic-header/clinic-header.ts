import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-clinic-header',
  templateUrl: './clinic-header.html',
  styleUrl: '../patient-header/patient-header.css',
})
export class ClinicHeader implements OnInit {
  @Input() clinicName = 'Minha clínica';
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  title = '';

  ngOnInit(): void {
    this.updateTitle();
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.updateTitle());
  }

  private updateTitle(): void {
    let currentRoute = this.route.root;
    while (currentRoute.firstChild) currentRoute = currentRoute.firstChild;
    this.title = currentRoute.snapshot.data['title'] ?? '';
  }
}
