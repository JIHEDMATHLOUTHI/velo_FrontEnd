import { Injectable } from '@angular/core';
import { Defi } from '../model/Defi';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class DefiServiceService {

  private baseUrl = 'http://localhost:8081/api'; // L'URL de base de votre backend

  constructor(private authservice:AuthService,private httpClient: HttpClient) { }

  addProduct1(Carpooling: Defi){
    // Créer les en-têtes de la requête avec le token JWT inclus dans le header Authorization
    const token = this.authservice.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

        // Utilisez les en-têtes définis pour l'envoi de données
    return this.httpClient.post<Defi>(`${this.baseUrl}/carpooling/adddd`,Carpooling, { headers });
  }

  isWinning(name: string): Observable<boolean> {
    const token = this.authservice.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.httpClient.get<boolean>(`${this.baseUrl}/carpooling/is-winning?name=${name}`, { headers });
  }
  calculatePoints1(): Observable<number> {
    const token = this.authservice.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.httpClient.get<number>(`${this.baseUrl}/carpooling/calculate-points`, { headers });
  }
  getAcceptedUsers(): Observable<string[]> {
    const token = this.authservice.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.httpClient.get<string[]>(`${this.baseUrl}/carpooling/accepted-users`, { headers });
  }


  ///////////////////////////////////////////////////
  participer(id: number): Observable<string> {
    const token = this.authservice.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.httpClient.post<string>(`${this.baseUrl}/carpooling/participer?id=${id}`, null, { headers });
  }
  ////////////////////////////////////////////////////


  public getProductById(pid:number){
    return this.httpClient.get<Defi>("http://localhost:8081/api/carpooling/"+pid)
  }
  public getAllProduct(){
    return this.httpClient.get<Defi[]>(this.baseUrl + "/carpooling/getall")
  }



}
