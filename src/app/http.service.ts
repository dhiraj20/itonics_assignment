import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Role, User } from './model';

const BASE_URL = 'http://localhost:3000';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${BASE_URL}/userList`);
  }

  getUser(id: string): Observable<any> {
    return this.http.get(`${BASE_URL}/userList/${id}`);
  }

  createUser(payload: User): Observable<any> {
    return this.http.post(`${BASE_URL}/userList`, payload);
  }

  updateUser(payload: User): Observable<any> {
    return this.http.put(`${BASE_URL}/userList/${payload.id}`, payload);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${BASE_URL}/userList/${id}`);
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${BASE_URL}/roles`);
  }

  createRole(payload: Role): Observable<any> {
    return this.http.post(`${BASE_URL}/roles`, payload);
  }

  updateRole(payload: Role): Observable<any> {
    return this.http.put(`${BASE_URL}/roles/${payload.id}`, payload);
  }

  deleteRole(id: string): Observable<any> {
    return this.http.delete(`${BASE_URL}/roles/${id}`);
  }
}
