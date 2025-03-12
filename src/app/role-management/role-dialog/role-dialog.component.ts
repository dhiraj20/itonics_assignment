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
  ],
})
export class RoleDialogComponent implements OnInit {
  roleForm: FormGroup;
  readonly dialogRef = inject(MatDialogRef<RoleDialogComponent>);

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.roleForm = this.formBuilder.group({
      roleName: ['', [Validators.required, Validators.minLength(3)]],
      permissions: [[], Validators.required],
    });
  }

  ngOnInit() {
    console.log(this.data);
    this.loadRoleData();
  }

  loadRoleData(): void {
    this.roleForm.setValue({
      roleName: this.data.roleName,
      permissions: this.data.permissions,
    });
  }

  permissions = [
    { value: 'create', viewValue: 'Create' },
    { value: 'edit', viewValue: 'Edit' },
    { value: 'delete', viewValue: 'Delete' },
    { value: 'view_users', viewValue: 'View Users' },
  ];

  createRole() {
    console.log(this.roleForm.value);
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
