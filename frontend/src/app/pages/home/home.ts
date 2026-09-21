import { Component, OnInit, Inject } from '@angular/core';
import { Supabase } from '../../services/supabase';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  SupabaseService = Inject(Supabase);

  constructor(){
    
    console.log(this.SupabaseService.ok());
  }

}
