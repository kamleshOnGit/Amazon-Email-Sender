import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { AuthService } from './auth.services';
@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor(private http: HttpClient , private authService: AuthService ) { }
  id: number;
  role: string;
  vendorId: string ;
  authToken = this.authService.getToken();

  public getData = (route: string) => {
    return this.http.get(this.createCompleteRoute(route, environment.urlAddress) , this.generateHeaders());
  }

  public create = (route: string, body) => {
    return this.http.post(this.createCompleteRoute(route, environment.urlAddress), body, this.generateHeaders());
  }

  public update = (route: string, body) => {
    return this.http.put(this.createCompleteRoute(route, environment.urlAddress), body, this.generateHeaders());
  }

  public delete = (route: string) => {
    return this.http.delete(this.createCompleteRoute(route, environment.urlAddress));
  }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }
}
