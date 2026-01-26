import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-teacher-layout',
  imports: [CommonModule, RouterLink, RouterOutlet, DrawerModule, ButtonModule, AvatarModule],
  templateUrl: './teacher-layout.html',
  styleUrl: './teacher-layout.css',
})
export class TeacherLayout {
  sidebarVisible = false;
}
