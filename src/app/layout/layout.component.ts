import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, MatSidenavModule, RouterModule, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  links = [
    { id: 1, path: '/role/view', name: 'View' },
    { id: 2, path: '/role/create', name: 'Create' },
    { id: 1, path: '/user/view', name: 'View' },
    { id: 2, path: '/user/create', name: 'Create' },
  ];
}
