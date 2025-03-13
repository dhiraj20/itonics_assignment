import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import { Role, User } from '../model';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
  ],
  providers: [AuthService, HttpService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      userName: ['dhiraj', Validators.required],
      password: ['password', [Validators.required]],
    });
  }

  login() {
    const { userName, password } = this.loginForm.value;
    this.httpService.getUsers().subscribe((userList) => {
      const user: User | undefined = userList.find(
        (user) => user.userName === userName && user.password === password
      );
      this.httpService.getRoles().subscribe((roles) => {
        const role = roles.find(
          (role: Role) => role.roleName === user?.roleName
        );
        user!.permissions = role?.permissions;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['/user/detail']);
        }
      });
    });
  }
}
