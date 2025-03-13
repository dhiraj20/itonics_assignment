import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Role, User } from './model';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/userList');
  }

  createUser(payload: User): Observable<any> {
    return this.http.post('http://localhost:3000/userList', payload);
  }

  updateUser(payload: User): Observable<any> {
    return this.http.put(
      `http://localhost:3000/userList/${payload.id}`,
      payload
    );
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/userList/${id}`);
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`http://localhost:3000/roles`);
  }

  createRole(payload: Role): Observable<any> {
    return this.http.post('http://localhost:3000/roles', payload);
  }

  updateRole(payload: Role): Observable<any> {
    return this.http.put(`http://localhost:3000/roles/${payload.id}`, payload);
  }

  deleteRole(id: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/roles/${id}`);
  }
}
