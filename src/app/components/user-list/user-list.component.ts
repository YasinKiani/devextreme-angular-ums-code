import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  DxButtonModule,
  DxDataGridModule,
  DxTemplateModule,
} from 'devextreme-angular';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    DxDataGridModule,
    DxTemplateModule,
    DxButtonModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  @Input() users: User[] = [];
  @Output() add = new EventEmitter<void>();
  @Output() edit = new EventEmitter<User>();
  @Output() delete = new EventEmitter<User>();

  readonly defaultAvatar = 'assets/default-avatar.png';

  onAdd(): void {
    this.add.emit();
  }

  onEdit(user: User): void {
    this.edit.emit(user);
  }

  onDelete(user: User): void {
    this.delete.emit(user);
  }
}
