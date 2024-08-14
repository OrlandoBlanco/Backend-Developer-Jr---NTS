import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  API_URL: string = 'http://127.0.0.1:5500/';
  constructor(private httpclient: HttpClient) { }

  getproducts(): Observable<any> {
    return this.httpclient.get(this.API_URL).pipe(res=> res);
  }

}
