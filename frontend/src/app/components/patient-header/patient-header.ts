import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-patient-header',
  imports: [RouterLink],
  templateUrl: './patient-header.html',
  styleUrl: './patient-header.css',
})
export class PatientHeader implements OnInit {
  private route = inject(ActivatedRoute);
  router = inject(Router);

  title = '';

  ngOnInit() {
    // pega o valor inicial (primeira renderização)
    this.updateTitle();

    // atualiza toda vez que a navegação terminar
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.updateTitle());
  }

  private updateTitle() {
    let currentRoute = this.route.root;

    // desce a árvore de rotas até achar a rota folha (a que não tem mais filhos ativos)
    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    }

    this.title = currentRoute.snapshot.data['title'] ?? '';
  }
}
