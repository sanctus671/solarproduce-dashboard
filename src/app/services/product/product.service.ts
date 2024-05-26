import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError} from 'rxjs';
import { tap, map, switchMap, catchError } from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

    constructor(private http: HttpClient) { }
    
    public getProducts(query): Observable<any> {
        return this.http.get( environment.apiUrl + '/products?order_by=' + query.order_by + "&order=" + query.order + "&page=" + query.page + "&limit=" + query.limit + "&search=" + query.search)
        .pipe(tap((response) => {
        }));  
    }
    
    public getProduct(id): Observable<any> {
        return this.http.get( environment.apiUrl + '/products/' + id)
        .pipe(tap((response) => {
        }));
    } 
    
 
  
    
    public createProduct(product): Observable<any> {
        return this.http.post( environment.apiUrl + '/products', product)
        .pipe(tap((response) => {
        }));
    }    
    
    
    public updateProduct(product): Observable<any> {
        return this.http.put( environment.apiUrl + '/products/' + product.id, product)
        .pipe(tap((response) => {
            
        }));
    }       
    
    
    public saveProductPrice(productPrice): Observable<any> {
        return this.http.post( environment.apiUrl + '/productprices', productPrice)
        .pipe(tap((response) => {
            
        }));
    } 
    
    public deleteProduct(productId): Observable<any> {
        return this.http.delete( environment.apiUrl + '/products/' + productId)
        .pipe(tap((response) => {
            
        }));
    }   
    
    public deleteSelectedProducts(ids): Observable<any> {
        return this.http.post( environment.apiUrl + '/products/deleteselected', ids)
        .pipe(tap((response) => {
            
        }));
    }     
    
    public exportProducts(query): Observable<any> {

        let paramaters = Object.keys(query).map(function(key) {
          return key + '=' + query[key];
        }).join('&');        
        
        return this.http.get( environment.apiUrl + '/exportproducts' + (paramaters ? ("?" + paramaters) : ""))
        .pipe(tap((response) => {
            
        }));
    } 
       
          
    
}
