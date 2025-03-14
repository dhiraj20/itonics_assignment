import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { User } from '../../model';
import { FlexLayoutModule } from 'ng-flex-layout';

@Component({
  selector: 'app-user-detail',
  imports: [FlexLayoutModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent implements OnInit {
  user!: User;
  constructor(private authSerevice: AuthService) {}
  ngOnInit(): void {
    this.user = this.authSerevice.getLoggedInUser()!;
  }
}
