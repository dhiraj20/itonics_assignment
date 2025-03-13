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
import { HttpService } from '../../http.service';
import { HttpClientModule } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../model';
import { AppService } from '../../app.service';
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
    HttpClientModule,
  ],
  providers: [HttpService],
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
  actionText: string = '';
  userAlreadyExists: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpService: HttpService,
    private appService: AppService
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

  ngOnInit(): void {
    this.loadRoleData();
    this.actionText = this.data ? 'Update user' : 'Create user';
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

  onSumbitHandler(): void {
    if (this.userForm.valid) {
      const {
        password,
        fullName,
        roleName,
        userName = '',
      } = this.userForm.value;
      const payload = {
        id: this.data ? this.data.id : uuidv4(),
        userName: this.data ? this.data.userName : userName,
        password,
        fullName,
        roleName,
      };
      this.data ? this.updateUser(payload) : this.createUser(payload);
    }
  }

  createUser(payload: User): void {
    this.httpService.getUsers().subscribe((users) => {
      const found = users.find((user) => user.userName === payload.userName);
      if (found) {
        this.userAlreadyExists = true;
      } else {
        this.httpService.createUser(payload).subscribe((value) => {
          this.closeDialog();
        });
      }
    });
  }

  updateUser(payload: User): void {
    this.httpService.updateUser(payload).subscribe((value) => {
      this.closeDialog(value);
    });
  }

  closeDialog(value: string = ''): void {
    this.dialogRef.close(value);
  }
}
