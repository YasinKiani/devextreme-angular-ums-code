import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserService } from './services/user.service';
import { User } from './models/user.model';
import {
  UserFormComponent,
  UserFormDialogData,
  UserFormResult,
} from './components/user-form/user-form.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, UserListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly dialog = inject(MatDialog);
  private readonly userService = inject(UserService);

  readonly users = signal<User[]>(this.userService.getUsers());
  readonly sidebarOpen = signal<boolean>(false);

  toggleSidebar(): void {
    this.sidebarOpen.update((value) => !value);
  }

  onAddUser(): void {
    this.openUserForm({ mode: 'create' });
  }

  onEditUser(user: User): void {
    this.openUserForm({ mode: 'edit', user });
  }

  onDeleteUser(user: User): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'حذف کاربر',
        description: `آیا از حذف ${user.firstName} ${user.lastName} مطمئن هستید؟`,
        confirmText: 'حذف کاربر',
        cancelText: 'انصراف',
      },
      width: '420px',
      maxWidth: '95vw',
      direction: 'rtl',
      panelClass: 'confirm-dialog-panel',
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.userService.deleteUser(user.id);
        this.refreshUsers();
      }
    });
  }

  private openUserForm(data: UserFormDialogData): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      data,
      width: '640px',
      maxWidth: '95vw',
      direction: 'rtl',
      panelClass: 'user-form-dialog',
    });

    dialogRef.afterClosed().subscribe((result?: UserFormResult) => {
      if (!result) {
        return;
      }

      if (data.mode === 'create') {
        const { id: _unused, ...payload } = result;
        this.userService.addUser(payload as Omit<User, 'id'>);
      } else if (data.mode === 'edit' && data.user) {
        const updated: User = {
          ...data.user,
          ...result,
          id: result.id ?? data.user.id,
        };
        this.userService.updateUser(updated.id, updated);
      }

      this.refreshUsers();
    });
  }

  private refreshUsers(): void {
    this.users.set(this.userService.getUsers());
  }
}
