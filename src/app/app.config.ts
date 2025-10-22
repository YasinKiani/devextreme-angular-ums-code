import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  DateAdapter,
} from '@angular/material/core';
import localeFa from '@angular/common/locales/fa';
import {
  JALALI_MOMENT_FORMATS,
  JalaliMomentDateAdapter,
} from './utils/jalali-date-adapter';

registerLocaleData(localeFa);

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    { provide: LOCALE_ID, useValue: 'fa-IR' },
    { provide: MAT_DATE_LOCALE, useValue: 'fa-IR' },
    { provide: DateAdapter, useClass: JalaliMomentDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: JALALI_MOMENT_FORMATS },
  ],
};
