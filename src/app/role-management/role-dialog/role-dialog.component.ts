import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
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
export class RoleDialogComponent {
  roleForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.roleForm = this.formBuilder.group({
      roleName: ['', [Validators.required, Validators.minLength(3)]],
      permissions: [[], Validators.required],
    });
  }

  permissions = [
    { value: 'create', viewValue: 'Create' },
    { value: 'edit', viewValue: 'Edit' },
    { value: 'delete', viewValue: 'Delete' },
    { value: 'view_users', viewValue: 'View Users' },
  ];
}
