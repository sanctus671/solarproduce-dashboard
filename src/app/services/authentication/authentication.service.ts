import { Injectable } from '@angular/core';
import { AuthService } from 'ngx-auth';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError} from 'rxjs';
import { tap, map, switchMap, catchError } from 'rxjs/operators';
import {environment} from '../../../environments/environment';

interface AccessData {
  accessToken: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements AuthService {

  constructor(private http: HttpClient) {}

  public isAuthorized(): Observable<boolean> {
    return this
      .getAccessToken()
      .pipe(map(token => !!token));
  }


  public refreshToken(): Observable<any> {
    return this
      .getRefreshToken()
      .pipe(
        switchMap((refreshToken: string) =>
          this.http.post(environment.apiUrl + '/refresh', { refreshToken })
        ),
        tap((response) => {
            //this.saveAccessData(tokens)
        }),
        catchError((err) => {
          this.logout();

          return throwError(err);
        })
      );
  }

  public refreshShouldHappen(response: HttpErrorResponse): boolean {
    return response.status === 400; //may need to update to 400
  }

  public verifyTokenRequest(url: string): boolean {
    return url.endsWith('/refresh');
  }
  
    public login(user): Observable<any> {
    return this.http.post( environment.apiUrl + '/dashboardlogin', user)
    .pipe(tap((response) => {
        this.saveAccessData({accessToken:response.authorisation.token, refreshToken:response.authorisation.token})
    }));
  }
  
    public register(user): Observable<any> {
    return this.http.post( environment.apiUrl + '/register', user)
    .pipe(tap((response) => {
        this.saveAccessData({accessToken:response.authorisation.token, refreshToken:response.authorisation.token})
    }));
  }  
  
  
  
    public recoverPassword(user): Observable<any> {
    return this.http.post( environment.apiUrl +'/recovery', user)
    .pipe(tap((response) => {
    }));
  }  
  
    public resetPassword(user): Observable<any> {
    return this.http.post( environment.apiUrl + '/reset', user)
    .pipe(tap((response) => {
    }));
  }
  
    public getUserData(){
        return this.http.get( environment.apiUrl + '/me')
        .pipe(tap((response:any) => {
            localStorage.setItem('pfc.userData', JSON.stringify(response));

        }));        
    }
    
    public updateUserData(user){
        return this.http.put( environment.apiUrl + '/me', user)
        .pipe(tap((response) => {
        }));        
    }    

  /**
   * Logout
   */
  public logout(): void {
    this.clear();
    location.reload();
  }

  /**
   * Save access data in the storage
   *
   * @private
   * @param {AccessData} data
   */
  private saveAccessData({ accessToken, refreshToken }: AccessData) {
    this
      .setAccessToken(accessToken)
      .setRefreshToken(refreshToken);
  }
  
  /**
   * Get access token
   * @returns {Observable<string>}
   */
  public getAccessToken(): Observable<string> {
    const token: string = <string>localStorage.getItem('pfc.accessToken');
    return of(token);
  }

  /**
   * Get refresh token
   * @returns {Observable<string>}
   */
  public getRefreshToken(): Observable<string> {
    const token: string = <string>localStorage.getItem('pfc.refreshToken');
    return of(token);
  }

  /**
   * Set access token
   * @returns {TokenStorage}
   */
  public setAccessToken(token: string): AuthenticationService {
    localStorage.setItem('pfc.accessToken', token);

    return this;
  }

   /**
   * Set refresh token
   * @returns {TokenStorage}
   */
  public setRefreshToken(token: string): AuthenticationService {
    localStorage.setItem('pfc.refreshToken', token);

    return this;
  }

   /**
   * Remove tokens
   */
  public clear() {
    localStorage.removeItem('pfc.accessToken');
    localStorage.removeItem('pfc.refreshToken');
  }

}
