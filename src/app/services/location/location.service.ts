import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError} from 'rxjs';
import { tap, map, switchMap, catchError } from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

    constructor(private http: HttpClient) { }
    
    public getLocations(query): Observable<any> {
        return this.http.get( environment.apiUrl + '/locations?order_by=' + query.order_by + "&order=" + query.order + "&page=" + query.page + "&limit=" + query.limit + "&search=" + query.search)
        .pipe(tap((response) => {
        }));  
    }
    
    public getLocation(id): Observable<any> {
        return this.http.get( environment.apiUrl + '/locations/' + id)
        .pipe(tap((response) => {
        }));
    } 
    
 
  
    
    public createLocation(location): Observable<any> {
        return this.http.post( environment.apiUrl + '/locations', location)
        .pipe(tap((response) => {
        }));
    }    
    
    
    public updateLocation(location): Observable<any> {
        return this.http.put( environment.apiUrl + '/locations/' + location.id, location)
        .pipe(tap((response) => {
            
        }));
    }    
    
    public deleteLocation(locationId): Observable<any> {
        return this.http.delete( environment.apiUrl + '/locations/' + locationId)
        .pipe(tap((response) => {
            
        }));
    }   
       
          
    
}
