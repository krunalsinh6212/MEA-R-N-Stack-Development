import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable, catchError, tap } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Product[]> {
    console.log('Fetching all products from:', baseUrl);
    return this.http.get<Product[]>(baseUrl)
      .pipe(
        tap(data => console.log('Products received:', data)),
        catchError(error => {
          console.error('Error fetching products:', error);
          throw error;
        })
      );
  }

  get(id: any): Observable<Product> {
    console.log(`Fetching product with id ${id} from: ${baseUrl}/${id}`);
    return this.http.get<Product>(`${baseUrl}/${id}`)
      .pipe(
        tap(data => console.log('Product received:', data)),
        catchError(error => {
          console.error('Error fetching product:', error);
          throw error;
        })
      );
  }

  create(data: any): Observable<any> {
    console.log('Creating product with data:', data);
    return this.http.post(baseUrl, data)
      .pipe(
        tap(response => console.log('Create response:', response)),
        catchError(error => {
          console.error('Error creating product:', error);
          throw error;
        })
      );
  }

  update(id: any, data: any): Observable<any> {
    console.log(`Updating product ${id} with data:`, data);
    return this.http.put(`${baseUrl}/${id}`, data)
      .pipe(
        tap(response => console.log('Update response:', response)),
        catchError(error => {
          console.error('Error updating product:', error);
          throw error;
        })
      );
  }

  delete(id: any): Observable<any> {
    if (!id) {
      throw new Error('Product ID is required for deletion');
    }
    console.log(`Deleting product with id: ${id}`);
    return this.http.delete(`${baseUrl}/${id}`)
      .pipe(
        tap(response => console.log('Delete response:', response)),
        catchError(error => {
          console.error('Error deleting product:', error);
          throw error;
        })
      );
  }

  deleteAll(): Observable<any> {
    console.log('Deleting all products');
    return this.http.delete(baseUrl)
      .pipe(
        tap(response => console.log('Delete all response:', response)),
        catchError(error => {
          console.error('Error deleting all products:', error);
          throw error;
        })
      );
  }

  findByTitle(title: any): Observable<Product[]> {
    console.log(`Searching for products with title: ${title}`);
    return this.http.get<Product[]>(`${baseUrl}?title=${title}`)
      .pipe(
        tap(data => console.log('Search results:', data)),
        catchError(error => {
          console.error('Error searching products:', error);
          throw error;
        })
      );
  }
}