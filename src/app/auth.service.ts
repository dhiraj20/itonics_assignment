import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  getLoggedInUser(): User | null {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('user');
      return JSON.parse(user!);
    }
    return null;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  checkAuthStatus(): boolean {
    const user = this.getLoggedInUser();
    return !!user;
  }

  hasPermission(permission: string) {
    const user = this.getLoggedInUser();
    const permissions = user && user.permissions;
    return permissions && permissions.includes(permission);
  }

  isSuperAdmin(): boolean {
    const user: User = this.getLoggedInUser()!;
    return user.isSuperUser!;
  }
}
