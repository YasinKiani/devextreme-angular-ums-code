import { Inject, Injectable, Optional } from '@angular/core';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatDateFormats,
} from '@angular/material/core';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import moment from 'moment-jalaali';
import 'moment/locale/fa';

type Moment = any;

// تنظیم moment-jalaali برای استفاده از اعداد انگلیسی
if (typeof (moment as any).loadPersian === 'function') {
  (moment as any).loadPersian({
    usePersianDigits: false,
    dialect: 'persian-modern',
  });
}

// فرمت‌های تاریخ شمسی برای Material DatePicker
export const JALALI_MOMENT_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'jYYYY/jM/jD',
  },
  display: {
    dateInput: 'jYYYY/jMM/jDD',
    monthYearLabel: 'jMMMM jYYYY',
    dateA11yLabel: 'jYYYY/jMM/jDD',
    monthYearA11yLabel: 'jMMMM jYYYY',
  },
};

@Injectable()
export class JalaliMomentDateAdapter extends MomentDateAdapter {
  constructor(
    @Optional() @Inject(MAT_DATE_LOCALE) matDateLocale: string,
    @Optional() @Inject(MAT_MOMENT_DATE_ADAPTER_OPTIONS) options?: any
  ) {
    super(matDateLocale || 'fa-IR', options);
    this.setLocale('fa');
  }

  override setLocale(locale: string): void {
    super.setLocale('fa');
    (moment as any).locale('fa');
  }

  override getYear(date: Moment): number {
    return (date as any).jYear ? (date as any).jYear() : moment(date).jYear();
  }

  override getMonth(date: Moment): number {
    return (date as any).jMonth
      ? (date as any).jMonth()
      : moment(date).jMonth();
  }

  override getDate(date: Moment): number {
    return (date as any).jDate ? (date as any).jDate() : moment(date).jDate();
  }

  override getDayOfWeek(date: Moment): number {
    return date.day();
  }

  override getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
    return [
      'فروردین',
      'اردیبهشت',
      'خرداد',
      'تیر',
      'مرداد',
      'شهریور',
      'مهر',
      'آبان',
      'آذر',
      'دی',
      'بهمن',
      'اسفند',
    ];
  }

  override getDateNames(): string[] {
    const dateNames: string[] = [];
    for (let i = 1; i <= 31; i++) {
      dateNames.push(String(i));
    }
    return dateNames;
  }

  override getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    switch (style) {
      case 'long':
        return [
          'یکشنبه',
          'دوشنبه',
          'سه‌شنبه',
          'چهارشنبه',
          'پنج‌شنبه',
          'جمعه',
          'شنبه',
        ];
      case 'short':
        return ['ی', 'د', 'س', 'چ', 'پ', 'ج', 'ش'];
      case 'narrow':
        return ['ی', 'د', 'س', 'چ', 'پ', 'ج', 'ش'];
    }
  }

  override getYearName(date: Moment): string {
    const year = (date as any).jYear
      ? (date as any).jYear()
      : moment(date).jYear();
    return year.toString();
  }

  override getFirstDayOfWeek(): number {
    return 6; // شنبه اولین روز هفته در ایران است
  }

  override getNumDaysInMonth(date: Moment): number {
    const year = this.getYear(date);
    const month = this.getMonth(date);

    // محاسبه دستی تعداد روزهای ماه در تقویم شمسی
    // 6 ماه اول (فروردین تا شهریور) 31 روز
    // 5 ماه بعدی (مهر تا بهمن) 30 روز
    // اسفند: 29 روز (سال عادی) یا 30 روز (سال کبیسه)
    if (month < 6) {
      return 31;
    } else if (month < 11) {
      return 30;
    } else {
      // بررسی کبیسه بودن سال
      return this.isLeapYear(year) ? 30 : 29;
    }
  }

  private isLeapYear(year: number): boolean {
    // فرمول محاسبه سال کبیسه شمسی
    const breaks = [1, 5, 9, 13, 17, 22, 26, 30];
    const cycle = 2820;
    const y = year - 474;
    const yCycle = y % cycle;
    const aux = yCycle + 474;

    let jp = breaks[0];
    for (let i = 1; i < breaks.length; i++) {
      const jump = breaks[i];
      if (aux < jump) {
        break;
      }
      jp = jump;
    }

    const n = aux - jp;
    return (n % 33) % 4 === 1;
  }

  override clone(date: Moment): Moment {
    return moment(date).locale('fa');
  }

  override createDate(year: number, month: number, date: number): Moment {
    if (month < 0 || month > 11) {
      throw Error(
        `Invalid month index "${month}". Month index has to be between 0 and 11.`
      );
    }

    if (date < 1) {
      throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
    }

    const result = moment()
      .jYear(year)
      .jMonth(month)
      .jDate(date)
      .hour(0)
      .minute(0)
      .second(0)
      .millisecond(0)
      .locale('fa');

    if (!result.isValid()) {
      throw Error(`Invalid date "${date}" for month with index "${month}".`);
    }

    return result;
  }

  override today(): Moment {
    return moment().locale('fa');
  }

  override parse(value: any, parseFormat: string | string[]): Moment | null {
    if (value && typeof value === 'string' && value.trim().length > 0) {
      const format = parseFormat || 'jYYYY/jMM/jDD';
      const date = moment(value.trim(), format, true);
      if (date.isValid()) {
        return date.locale('fa');
      }
    }
    return null;
  }

  override format(date: Moment, displayFormat: string): string {
    if (!this.isValid(date)) {
      return '';
    }
    const jDate = moment(date);
    return jDate.locale('fa').format(displayFormat);
  }

  override addCalendarYears(date: Moment, years: number): Moment {
    const jDate = moment(date);
    return (jDate as any).add(years, 'jYear');
  }

  override addCalendarMonths(date: Moment, months: number): Moment {
    const jDate = moment(date);
    return (jDate as any).add(months, 'jMonth');
  }

  override addCalendarDays(date: Moment, days: number): Moment {
    const jDate = moment(date);
    return jDate.add(days, 'day');
  }

  override toIso8601(date: Moment): string {
    const jDate = moment(date);
    return jDate.locale('en').toISOString();
  }

  override deserialize(value: any): Moment | null {
    if (value) {
      if (typeof value === 'string') {
        if (!value.length) {
          return null;
        }
        const date = moment(
          value,
          ['jYYYY/jMM/jDD', 'jYYYY/jM/jD', (moment as any).ISO_8601],
          true
        );
        return date.isValid() ? date.locale('fa') : null;
      }
      if ((moment as any).isMoment(value)) {
        return moment(value).locale('fa');
      }
    }
    return super.deserialize(value);
  }

  override isDateInstance(obj: any): boolean {
    return (moment as any).isMoment(obj);
  }

  override isValid(date: Moment): boolean {
    return date && (moment as any).isMoment(date) && date.isValid();
  }

  override invalid(): Moment {
    return (moment as any).invalid();
  }
}
