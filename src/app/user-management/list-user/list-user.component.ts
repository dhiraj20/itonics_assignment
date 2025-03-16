import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { CreateUserComponent } from '../create-user/create-user.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from '../../http.service';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { AppService } from '../../app.service';
import { Role, User } from '../../model';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-list-user',
  imports: [
    MatTableModule,
    MatButtonModule,
    HttpClientModule,
    CommonModule,
    MatChipsModule,
  ],
  providers: [HttpService, AppService],
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.scss',
})
export class ListUserComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  userList: User[] = [];
  displayedColumns: string[] = [
    'id',
    'userName',
    'roleName',
    'fullname',
    'actions',
  ];
  dataSource: User[] = [];

  constructor(
    private httpService: HttpService,
    private appService: AppService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const loggedUser: User = this.authService.getLoggedInUser()!;
    if (this.hasViewUserPermission() || this.isSuperAdmin()) {
      this.getUsers();
    } else {
      this.getUser(loggedUser.id);
    }
  }

  isSuperAdmin(): boolean {
    return this.authService.isSuperAdmin();
  }

  hasEditPermission() {
    return this.authService.hasPermission('edit');
  }

  hasDeletePermission(): boolean {
    return this.authService.hasPermission('delete')!;
  }

  hasCreatePermission(): boolean {
    return this.authService.hasPermission('create')!;
  }

  hasViewUserPermission(): boolean {
    return this.authService.hasPermission('view_users')!;
  }

  getUsers(): void {
    this.httpService.getUsers().subscribe((data) => {
      this.userList = data;
      this.dataSource = [...this.userList];
    });
  }

  getUser(id: string): void {
    this.httpService.getUser(id).subscribe((data) => {
      this.userList = [data];
      this.dataSource = [...this.userList];
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateUserComponent);

    dialogRef.afterClosed().subscribe((result) => {
      this.getUsers();
      if (result !== undefined) {
      }
    });
  }

  editRole(row: Role): void {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      data: { ...row, isEdit: true },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getUsers();
      if (result) {
        this.appService.openSnackBar('User updated successfully');
      }
    });
  }

  deleteRole(id: string) {
    this.httpService.deleteUser(id).subscribe((response) => {
      if (response) {
        this.getUsers();
        this.appService.openSnackBar('User deleted successfully');
      }
    });
  }
}
