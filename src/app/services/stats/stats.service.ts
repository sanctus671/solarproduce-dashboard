import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError} from 'rxjs';
import { tap, map, switchMap, catchError } from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

    constructor(private http: HttpClient) { }
    
    
    public getStats(timeframe): Observable<any> {
        return this.http.get( environment.apiUrl + '/stats?timeframe=' + timeframe)
        .pipe(tap((response) => {
            
        }));
    }     
    
    
    
}
