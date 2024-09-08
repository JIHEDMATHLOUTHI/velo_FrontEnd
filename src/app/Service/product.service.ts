import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { OrderDetails } from '../model/OrderDetails';
import { AuthService } from './auth.service';
import { CartDetail } from '../model/CartDetail';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8081/api'; // L'URL de base de votre backend

  constructor(private authservice:AuthService, private httpClient: HttpClient) {
  }



  addProduct(productData: FormData){
        // Utilisez les en-têtes définis pour l'envoi de données
    return this.httpClient.post<Product>(`${this.baseUrl}/addd`,productData);
  }


  public getProductById(pid:number){
    return this.httpClient.get<Product>("http://localhost:8081/api/" +pid)
  }
  public getAllProduct(){
    return this.httpClient.get<Product[]>(this.baseUrl + "/getall")
  }



    sendEmail(emailRequest: any): Observable<any> {
      const token = this.authservice.getToken();
      let headers = new HttpHeaders();
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
      return this.httpClient.post<any>("http://localhost:8081/api/sendHtmlEmail", emailRequest, { headers });
    }

  }
