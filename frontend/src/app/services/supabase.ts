import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class Supabase {
  private supabaseClient: SupabaseClient;

  constructor() {
    this.supabaseClient = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );

    console.log('ok');
  }

  async ok() {
    return await this.supabaseClient.auth.signUp({ email: 'josuemedrado193@gmail.com', password: '123' });
  }
}
