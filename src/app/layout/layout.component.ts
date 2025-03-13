import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    MatSidenavModule,
    RouterModule,
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  links = [
    { id: 1, path: '/user/detail', name: 'User Detail' },
    { id: 3, path: '/user/view', name: 'User List' },
  ];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    if (this.authService.isSuperAdmin()) {
      this.links.splice(1, 0, { id: 2, path: '/role/view', name: 'Role List' });
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
