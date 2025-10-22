declare module 'moment-jalaali' {
  import { Moment as MomentType } from 'moment';

  export interface Moment extends MomentType {
    jYear(): number;
    jYear(year: number): Moment;
    jMonth(): number;
    jMonth(month: number): Moment;
    jDate(): number;
    jDate(date: number): Moment;
    jDayOfYear(): number;
    jDayOfYear(day: number): Moment;
    jWeek(): number;
    jWeek(week: number): Moment;
    jWeekYear(): number;
    jWeekYear(year: number): Moment;
    jDaysInMonth(): number;
  }

  export interface MomentJalaaliStatic {
    (value?: any, format?: string | string[], strict?: boolean): Moment;
    (
      value?: any,
      format?: string | string[],
      language?: string,
      strict?: boolean
    ): Moment;

    locale(locale: string): string;
    isMoment(obj: any): obj is Moment;
    invalid(): Moment;
    ISO_8601: string;

    loadPersian(options?: {
      usePersianDigits?: boolean;
      dialect?: string;
    }): void;
  }

  const moment: MomentJalaaliStatic;
  export default moment;
}
