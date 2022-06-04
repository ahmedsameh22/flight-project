import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  islogin: boolean = false;
  isAdmin: boolean = false;
  type: any;
  constructor(private http: HttpClient) {}
  signUp(obj: any): Observable<any> {
    return this.http.post('http://localhost:3000/user/register', obj);
  }
  login(obj: any, type: any): Observable<any> {
    if (type == 'user')
      return this.http.post('http://localhost:3000/user/login', obj);
    else return this.http.post('http://localhost:3000/admin/login', obj);
  }
  showAll(): Observable<any> {
    return this.http.get('http://localhost:3000/flight/allflight');
  }
  getMe(): Observable<any> {
    return this.http.get('http://localhost:3000/user/me');
  }
  logOut(): Observable<any> {
    return this.http.get('http://localhost:3000/user/logout');
  }
  uploadImg(obj: any): Observable<any> {
    return this.http.post('http://localhost:3000/user/uploadimg', obj);
  }
  bookTicket(id: any): Observable<any> {
    return this.http.get(`http://localhost:3000/flight/book/${id}`);
  }
  deleteUser(id: any): Observable<any> {
    return this.http.get(`http://localhost:3000/user/delete/${id}`);
  }
  deleteFligh(id: any): Observable<any> {
    return this.http.get(`http://localhost:3000/flight/delete/${id}`);
  }
  getAllUser(): Observable<any> {
    return this.http.get('http://localhost:3000/user/alluser');
  }
  addFlight(obj: any): Observable<any> {
    return this.http.post('http://localhost:3000/admin/add', obj);
  }
  showFlight(id: any): Observable<any> {
    return this.http.get(`http://localhost:3000/flight/showticket/${id}`);
  }
  editFlight(obj: any, id: any): Observable<any> {
    return this.http.post(`http://localhost:3000/flight/edit/${id}`, obj);
  }
  reqFlight(obj: any): Observable<any> {
    return this.http.post('http://localhost:3000/user/reqflight', obj);
  }
}
