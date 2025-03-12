import { Component, inject, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from 'ng-flex-layout';
@Component({
  selector: 'app-create-user',
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule,
    FlexLayoutModule,
  ],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
})
export class CreateUserComponent {
  userForm: FormGroup;
  readonly dialogRef = inject(MatDialogRef<CreateUserComponent>);
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

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userForm = this.formBuilder.group({
      userName: [
        { value: '', disabled: this?.data ? true : false },
        [Validators.required, Validators.minLength(3)],
      ],
      password: ['', [Validators.required, Validators.minLength(3)]],
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      roleName: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    console.log(this.data);
    this.loadRoleData();
  }

  loadRoleData(): void {
    if (this.data) {
      this.userForm.setValue({
        userName: this.data.userName,
        password: this.data.password,
        fullName: this.data.fullName,
        roleName: this.data.roleName,
      });
    }
  }

  createUser() {}

  closeDialog() {
    this.dialogRef.close();
  }
}
