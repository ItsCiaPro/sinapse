import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarNav } from './components/sidebar-nav/sidebar-nav';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarNav],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('projeto_final');
}
