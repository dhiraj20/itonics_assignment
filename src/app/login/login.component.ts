import { Component } from '@angular/core';
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
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import { Role, User } from '../model';
import { AppService } from '../app.service';
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
    private appService: AppService,
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      userName: ['dhiraj', Validators.required],
      password: ['password', [Validators.required]],
    });
  }

  async login() {
    const { userName, password } = this.loginForm.value;
    this.httpService.getUsers().subscribe((userList) => {
      const user: User | undefined = userList.find(
        (user) => user.userName === userName && user.password === password
      );
      if (!user) {
        this.appService.openSnackBar('User not found');
        return;
      }
      this.httpService.getRoles().subscribe((roles) => {
        const role = roles.find(
          (role: Role) => role.roleName === user?.roleName
        );
        user!.permissions = user.isSuperUser ? [] : role?.permissions;
        let copyUser = { ...user };
        delete copyUser.password;
        if (user) {
          localStorage.setItem('user', JSON.stringify(copyUser));
          this.router.navigate(['/user/detail']);
        }
      });
    });
  }
}
