import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError} from 'rxjs';
import { tap, map, switchMap, catchError } from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

    constructor(private http: HttpClient) { }
    
    public getBusinesses(query): Observable<any> {
        return this.http.get( environment.apiUrl + '/businesses?order_by=' + query.order_by + "&order=" + query.order + "&page=" + query.page + "&limit=" + query.limit + "&search=" + query.search)
        .pipe(tap((response) => {
        }));  
    }
    
    public getBusiness(id): Observable<any> {
        return this.http.get( environment.apiUrl + '/businesses/' + id)
        .pipe(tap((response) => {
        }));
    } 
    
 
  
    
    public createBusiness(business): Observable<any> {
        return this.http.post( environment.apiUrl + '/businesses', business)
        .pipe(tap((response) => {
        }));
    }    
    
    
    public updateBusiness(business): Observable<any> {
        return this.http.put( environment.apiUrl + '/businesses/' + business.id, business)
        .pipe(tap((response) => {
            
        }));
    }    
    
    public deleteBusiness(businessId): Observable<any> {
        return this.http.delete( environment.apiUrl + '/businesses/' + businessId)
        .pipe(tap((response) => {
            
        }));
    }   
       
          
    
}
