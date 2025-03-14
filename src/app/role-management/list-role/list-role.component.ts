import { Component, inject, Input, input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { RoleDialogComponent } from '../role-dialog/role-dialog.component';
import { HttpService } from '../../http.service';
import { HttpClientModule } from '@angular/common/http';
import { AppService } from '../../app.service';
import { Role } from '../../model';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { FlexLayoutModule } from 'ng-flex-layout';

interface Permissions {
  [key: string]: string;
}

@Component({
  selector: 'app-list-role',
  imports: [
    MatTableModule,
    MatButtonModule,
    HttpClientModule,
    CommonModule,
    MatChipsModule,
    FlexLayoutModule,
  ],
  providers: [HttpService, AppService],
  templateUrl: './list-role.component.html',
  styleUrl: './list-role.component.scss',
})
export class ListRoleComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  roleList: Role[] = [];
  @Input() refreshList: boolean = false;

  displayedColumns: string[] = ['id', 'roleName', 'permissions', 'actions'];
  dataSource: Role[] = [];

  permissionsObj: Permissions = {
    create: 'Create',
    edit: 'Edit',
    delete: 'Delete',
    view_users: 'View Users',
  };

  constructor(
    private httpService: HttpService,
    private appService: AppService
  ) {}

  ngOnInit(): void {
    this.getRoleList();
  }

  getPermissionLabel(permission: string) {
    return this.permissionsObj[permission];
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RoleDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getRoleList();
      }
    });
  }

  getRoleList(): void {
    this.httpService.getRoles().subscribe((response) => {
      this.roleList = response;
      this.dataSource = [...this.roleList];
    });
  }

  editRole(row: Role): void {
    const dialogRef = this.dialog.open(RoleDialogComponent, {
      data: row,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getRoleList();
      }
    });
  }

  deleteRole(id: string): void {
    this.httpService.deleteRole(id).subscribe((response) => {
      if (response) {
        this.getRoleList();
        this.appService.openSnackBar('Role deleted successfully');
      }
    });
  }
}
