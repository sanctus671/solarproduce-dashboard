import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError} from 'rxjs';
import { tap, map, switchMap, catchError } from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }
    
    public getUsers(query): Observable<any> {
        return this.http.get( environment.apiUrl + '/users?order_by=' + query.order_by + "&order=" + query.order + "&page=" + query.page + "&limit=" + query.limit + "&search=" + query.search)
        .pipe(tap((response) => {
        }));  
    }
    
    public getUser(id): Observable<any> {
        return this.http.get( environment.apiUrl + '/users/' + id)
        .pipe(tap((response) => {
        }));
    } 
    
 
  
    
    public createUser(user): Observable<any> {
        return this.http.post( environment.apiUrl + '/users', user)
        .pipe(tap((response) => {
        }));
    }    
    
    
    public updateUser(user): Observable<any> {
        return this.http.put( environment.apiUrl + '/users/' + user.id, user)
        .pipe(tap((response) => {
            
        }));
    }    
    
    public deleteUser(userId): Observable<any> {
        return this.http.delete( environment.apiUrl + '/users/' + userId)
        .pipe(tap((response) => {
            
        }));
    }   
    
    public deleteSelectedUsers(ids): Observable<any> {
        return this.http.post( environment.apiUrl + '/users/deleteselected', ids)
        .pipe(tap((response) => {
            
        }));
    }     
    
    public exportUsers(query): Observable<any> {

        let paramaters = Object.keys(query).map(function(key) {
          return key + '=' + query[key];
        }).join('&');        
        
        return this.http.get( environment.apiUrl + '/exportusers' + (paramaters ? ("?" + paramaters) : ""))
        .pipe(tap((response) => {
            
        }));
    } 
    
    public getLocations(): Observable<any> {
        return this.http.get( environment.apiUrl + '/locations')
        .pipe(tap((response) => {
        }));  
    }
       
          
    
        
}

