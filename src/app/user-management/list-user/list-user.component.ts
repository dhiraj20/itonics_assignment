import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { CreateUserComponent } from '../create-user/create-user.component';
import { RoleDialogComponent } from '../../role-management/role-dialog/role-dialog.component';

@Component({
  selector: 'app-list-user',
  imports: [MatTableModule, MatButtonModule],
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.scss',
})
export class ListUserComponent {
  readonly dialog = inject(MatDialog);
  userList = [
    {
      id: 1,
      userName: 'dhiraj',
      roleName: 'Manager',
      fullName: 'Dhiraj Majhi',
      password: 'password',
    },
    {
      id: 2,
      userName: 'dhiraj2',
      roleName: 'Manager',
      fullName: 'Dhiraj Majhi2',
      password: 'password',
    },
    {
      id: 3,
      userName: 'dhiraj3',
      roleName: 'Manager',
      fullName: 'Dhiraj Majhi3',
      password: 'password',
    },
    {
      id: 4,
      userName: 'dhiraj4',
      roleName: 'Manager',
      fullName: 'Dhiraj Majhi4',
      password: 'password',
    },
  ];

  openDialog() {
    const dialogRef = this.dialog.open(CreateUserComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result !== undefined) {
      }
    });
  }

  displayedColumns: string[] = [
    'id',
    'userName',
    'roleName',
    'fullname',
    'actions',
  ];
  dataSource = [...this.userList];

  editRole(row: any): void {
    console.log('editRole', row);
    const dialogRef = this.dialog.open(CreateUserComponent, {
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
