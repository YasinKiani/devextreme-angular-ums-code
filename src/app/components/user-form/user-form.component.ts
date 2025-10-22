import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import moment from 'moment-jalaali';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

type Moment = any;

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatMomentDateModule,
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly userService = inject(UserService);
  private readonly dialogRef = inject(MatDialogRef<UserFormComponent>);
  readonly data = inject<UserFormDialogData>(MAT_DIALOG_DATA, {
    optional: true,
  });

  readonly defaultAvatar = 'assets/default-avatar.png';
  readonly maxBirthDate = moment();
  readonly minBirthDate = moment().subtract(150, 'years');

  readonly educationOptions: string[] = [
    'دیپلم',
    'کاردانی',
    'کارشناسی',
    'کارشناسی ارشد',
    'دکتری',
  ];

  readonly form = this.fb.nonNullable.group({
    firstName: ['', [Validators.required, Validators.maxLength(50)]],
    lastName: ['', [Validators.required, Validators.maxLength(50)]],
    age: [0, [Validators.required, Validators.min(0), Validators.max(150)]],
    education: ['', Validators.required],
    nationalId: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    birthDate: [moment(), Validators.required],
    profilePhoto: [this.defaultAvatar, Validators.required],
  });

  readonly dialogTitle = computed(() =>
    this.data?.mode === 'edit' ? 'ویرایش کاربر' : 'افزودن کاربر جدید'
  );

  photoPreview = this.defaultAvatar;

  constructor() {
    if (this.data?.user) {
      const user = this.data.user;
      this.photoPreview = user.profilePhoto || this.defaultAvatar;
      this.form.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
        education: user.education,
        nationalId: user.nationalId,
        birthDate: this.fromJalali(user.birthDate),
        profilePhoto: this.photoPreview,
      });
    } else {
      this.form.patchValue({
        age: 18,
        birthDate: moment(),
        profilePhoto: this.defaultAvatar,
      });
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const nationalId = this.form.controls.nationalId.value.trim();
    this.form.controls.nationalId.setValue(nationalId);
    const existingId = this.data?.user?.id;
    if (this.userService.nationalIdExists(nationalId, existingId)) {
      this.form.controls.nationalId.setErrors({ notUnique: true });
      this.form.controls.nationalId.markAsTouched();
      return;
    }

    const payload: UserFormResult = {
      id: existingId,
      firstName: this.form.controls.firstName.value.trim(),
      lastName: this.form.controls.lastName.value.trim(),
      age: this.form.controls.age.value,
      education: this.form.controls.education.value,
      nationalId,
      birthDate: this.toJalali(this.form.controls.birthDate.value),
      profilePhoto: this.form.controls.profilePhoto.value,
    };

    this.dialogRef.close(payload);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files && input.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.photoPreview = reader.result as string;
      this.form.controls.profilePhoto.setValue(this.photoPreview);
      input.value = '';
    };
    reader.readAsDataURL(file);
  }

  useDefaultAvatar(): void {
    this.photoPreview = this.defaultAvatar;
    this.form.controls.profilePhoto.setValue(this.defaultAvatar);
  }

  private toJalali(date: Moment): string {
    return date ? date.clone().locale('fa').format('jYYYY/jMM/jDD') : '';
  }

  private fromJalali(value: string): Moment {
    return value ? moment(value, 'jYYYY/jMM/jDD').locale('fa') : moment();
  }
}

export interface UserFormDialogData {
  mode: 'create' | 'edit';
  user?: User;
}

export type UserFormResult = Omit<User, 'id'> & { id?: string };
