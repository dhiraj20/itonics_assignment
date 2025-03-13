import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { ListRoleComponent } from './role-management/list-role/list-role.component';
import { ListUserComponent } from './user-management/list-user/list-user.component';
import { UserDetailComponent } from './user-management/user-detail/user-detail.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'role',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'view', component: ListRoleComponent },
      { path: '**', component: NotfoundComponent },
    ],
  },
  {
    path: 'user',
    component: LayoutComponent,
    children: [
      { path: 'detail', component: UserDetailComponent },
      { path: 'view', component: ListUserComponent },
      { path: '**', component: NotfoundComponent },
    ],
  },
];
