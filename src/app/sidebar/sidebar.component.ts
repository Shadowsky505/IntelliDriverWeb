import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient){}
  support() {
    console.log(`clicked`);
  }
  loginout() {
    return this.http.get<string[]>(`${this.apiUrl}/logout`);
  }
}
