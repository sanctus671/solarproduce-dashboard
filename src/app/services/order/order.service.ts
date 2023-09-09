import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError} from 'rxjs';
import { tap, map, switchMap, catchError } from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

    constructor(private http: HttpClient) { }
    
    public getOrders(query): Observable<any> {
        return this.http.get( environment.apiUrl + '/orders?order_by=' + query.order_by + "&order=" + query.order + "&page=" + query.page + "&limit=" + query.limit + "&search=" + query.search)
        .pipe(tap((response) => {
        }));  
    }
    
    public getOrder(id): Observable<any> {
        return this.http.get( environment.apiUrl + '/orders/' + id)
        .pipe(tap((response) => {
        }));
    } 
    
 
  
    
    public createOrder(order): Observable<any> {
        return this.http.post( environment.apiUrl + '/orders', order)
        .pipe(tap((response) => {
        }));
    }    
    
    
    public updateOrder(order): Observable<any> {
        return this.http.put( environment.apiUrl + '/orders/' + order.id, order)
        .pipe(tap((response) => {
            
        }));
    }    
    
    public deleteOrder(orderId): Observable<any> {
        return this.http.delete( environment.apiUrl + '/orders/' + orderId)
        .pipe(tap((response) => {
            
        }));
    }   
    
    public deleteSelectedOrders(ids): Observable<any> {
        return this.http.post( environment.apiUrl + '/orders/deleteselected', ids)
        .pipe(tap((response) => {
            
        }));
    }     
    
    public exportOrders(query): Observable<any> {

        let paramaters = Object.keys(query).map(function(key) {
          return key + '=' + query[key];
        }).join('&');        
        
        return this.http.get( environment.apiUrl + '/exportorders' + (paramaters ? ("?" + paramaters) : ""))
        .pipe(tap((response) => {
            
        }));
    } 
       
          
    
}
