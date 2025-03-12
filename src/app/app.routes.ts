import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { ListRoleComponent } from './role-management/list-role/list-role.component';
import { CreateRoleComponent } from './role-management/create-role/create-role.component';
import { CreateUserComponent } from './user-management/create-user/create-user.component';
import { ListUserComponent } from './user-management/list-user/list-user.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'role',
    component: LayoutComponent,
    children: [
      { path: 'view', component: ListRoleComponent },
      { path: 'create', component: CreateRoleComponent },
    ],
  },
  {
    path: 'user',
    component: LayoutComponent,
    children: [{ path: 'view', component: ListUserComponent }],
  },
];
