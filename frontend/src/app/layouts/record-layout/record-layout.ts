import { Component } from '@angular/core';
import { SidebarNav } from '../../components/sidebar-nav/sidebar-nav';
import { PatientHeader } from '../../components/patient-header/patient-header';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-record-layout',
  imports: [SidebarNav, PatientHeader, RouterOutlet],
  templateUrl: './record-layout.html',
  styleUrl: './record-layout.css',
})
export class RecordLayout {

}
