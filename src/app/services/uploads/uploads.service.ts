import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UploadsService {
    constructor(public http: HttpClient) {

    }

  uploadFile(mediaFile: FormData): Observable<any> {
    return this.http.post( environment.apiUrl + '/upload', mediaFile)
        .pipe(tap((response) => {
            
        }));
  }
}
