import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatTable, MatTableModule } from '@angular/material/table';
import { RoleDialogComponent } from '../role-dialog/role-dialog.component';

@Component({
  selector: 'app-list-role',
  imports: [MatTableModule, MatButtonModule],
  templateUrl: './list-role.component.html',
  styleUrl: './list-role.component.scss',
})
export class ListRoleComponent {
  readonly dialog = inject(MatDialog);
  roleList = [
    {
      id: 1,
      roleName: 'Manager',
      permissions: ['create', 'edit'],
    },
    {
      id: 2,
      roleName: 'Trainee',
      permissions: ['create', 'edit', 'delete'],
    },
    {
      id: 3,
      roleName: 'Teacher',
      permissions: ['create', 'edit', 'delete', 'view_users'],
    },
  ];

  displayedColumns: string[] = ['id', 'roleName', 'permissions', 'actions'];
  dataSource = [...this.roleList];

  editRole(row: any): void {
    console.log('editRole');
    const dialogRef = this.dialog.open(RoleDialogComponent, {
      data: row,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result !== undefined) {
      }
    });
  }

  deleteRole(id: number) {
    console.log('deleteRole', id);
  }
}
