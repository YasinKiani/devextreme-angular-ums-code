import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly storageKey = 'ums-users';
  private readonly platformId = inject(PLATFORM_ID);
  private inMemoryUsers: User[] = [];

  getUsers(): User[] {
    return [...this.loadUsers()];
  }

  addUser(user: Omit<User, 'id'>): void {
    const users = this.loadUsers();
    const withId = { ...user, id: this.createId() };
    users.push(withId);
    this.persist(users);
  }

  updateUser(id: string, user: User): void {
    const users = this.loadUsers();
    const index = users.findIndex((item) => item.id === id);
    if (index === -1) {
      return;
    }
    users[index] = { ...user, id };
    this.persist(users);
  }

  deleteUser(id: string): void {
    const users = this.loadUsers().filter((item) => item.id !== id);
    this.persist(users);
  }

  nationalIdExists(nationalId: string, excludeId?: string): boolean {
    return this.loadUsers().some(
      (user) => user.nationalId === nationalId && user.id !== excludeId
    );
  }

  private loadUsers(): User[] {
    if (!isPlatformBrowser(this.platformId)) {
      return [...this.inMemoryUsers];
    }
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) {
      this.inMemoryUsers = [];
      return [];
    }
    try {
      const parsed = JSON.parse(raw) as User[];
      this.inMemoryUsers = [...parsed];
      return parsed;
    } catch (error) {
      console.error('Cannot parse users from LocalStorage', error);
      this.inMemoryUsers = [];
      return [];
    }
  }

  private persist(users: User[]): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.inMemoryUsers = [...users];
      return;
    }
    localStorage.setItem(this.storageKey, JSON.stringify(users));
    this.inMemoryUsers = [...users];
  }

  private createId(): string {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      return crypto.randomUUID();
    }
    return Math.random().toString(36).substring(2, 10);
  }
}
