import { CommonModule } from '@angular/common';
import { Component, Inject, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from 'ng-flex-layout';
import { HttpService } from '../../http.service';
import { HttpClientModule } from '@angular/common/http';
import { AppService } from '../../app.service';
import { v4 as uuidv4 } from 'uuid';
import { Role } from '../../model';

@Component({
  selector: 'app-role-dialog',
  templateUrl: './role-dialog.component.html',
  styleUrls: ['./role-dialog.component.css'],
  imports: [
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
  ],
  providers: [HttpService, AppService],
})
export class RoleDialogComponent implements OnInit {
  roleForm: FormGroup;
  readonly dialogRef = inject(MatDialogRef<RoleDialogComponent>);
  actionText: string = '';

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpService: HttpService,
    private appService: AppService
  ) {
    this.roleForm = this.formBuilder.group({
      roleName: ['', [Validators.required, Validators.minLength(3)]],
      permissions: [[], Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadRoleData();
    console.log(this.data);
    this.actionText = this.data ? 'Update user role' : 'Create user role';
  }

  loadRoleData(): void {
    if (this.data) {
      this.roleForm.setValue({
        roleName: this.data.roleName,
        permissions: this.data.permissions,
      });
    }
  }

  permissions = [
    { value: 'create', viewValue: 'Create' },
    { value: 'edit', viewValue: 'Edit' },
    { value: 'delete', viewValue: 'Delete' },
    { value: 'view_users', viewValue: 'View Users' },
  ];

  onSumbitHandler(): void {
    const { roleName, permissions } = this.roleForm.value;
    const payload: Role = {
      id: this.data ? this.data.id : uuidv4(),
      roleName,
      permissions,
    };
    if (this.roleForm.valid) {
      this.data ? this.updateUserRole(payload) : this.createUserRole(payload);
    }
  }

  createUserRole(payload: Role) {
    this.httpService.createRole(payload).subscribe((response) => {
      if (response) {
        this.closeDialog(response);
        this.appService.openSnackBar('Role created successfully');
      }
    });
  }

  updateUserRole(payload: Role) {
    this.httpService.updateRole(payload).subscribe((response) => {
      if (response) {
        this.closeDialog(response);
        this.appService.openSnackBar('Role updated successfully');
      }
    });
  }

  closeDialog(response = '') {
    this.dialogRef.close(response);
  }
}
