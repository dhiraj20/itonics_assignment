import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSidenavModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'assignment';
  authenticate = true;
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.checkIsUserLoggedIn();
  }

  checkIsUserLoggedIn() {
    const isLogegdIn = this.authService.checkAuthStatus();
    if (!isLogegdIn) {
      this.router.navigate(['login']);
    }
  }
}
