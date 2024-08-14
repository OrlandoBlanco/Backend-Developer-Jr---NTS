import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // URL de la API, asegúrate de que sea correcta
  private readonly API_URL = 'http://localhost:3000/api/hoteles';

  constructor(private http: HttpClient) { }

  // Obtener todos los hoteles
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL);
  }

  // Crear un nuevo hotel
  createHotel(hotel: any): Observable<any> {
    return this.http.post<any>(this.API_URL, hotel);
  }

  // Actualizar un hotel existente
  updateHotel(id: string, updates: any): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/${id}`, updates);
  }

  // Eliminar un hotel
  deleteHotel(id: string): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/${id}`);
  }
}

