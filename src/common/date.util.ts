export namespace DateUtil {
  export const SECOND = 1_000;
  export const MINUTE = 60 * SECOND;
  export const HOUR = 60 * MINUTE;
  export const DAY = 24 * HOUR;
  export const WEEK = 7 * DAY;
  export const MONTH = 30 * DAY;

  /**
   * Converts a Date object to a string in the format 'YYYY-MM-DD' or 'YYYY-MM-DD HH:MM:SS'.
   *
   * @param date - The Date object to convert.
   * @param hms - Optional boolean flag indicating whether to include hours, minutes, and seconds in the output string.
   *              If true, the output will include time in 'HH:MM:SS' format. Defaults to false.
   * @returns A string representing the date in 'YYYY-MM-DD' format, or 'YYYY-MM-DD HH:MM:SS' format if `hms` is true.
   * 
   * @author luke
   * @since 2025.03.02
   */
  export function toString(date: Date, hms: boolean = false): string {
    const ymd: string = [
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
    ]
      .map((v) => _To_string(v))
      .join("-");

    if (!hms) return ymd;

    return (
      `${ymd} ` +
      [date.getHours(), date.getMinutes(), date.getSeconds()]
        .map((v) => _To_string(v))
        .join(":")
    );
  }

  export interface IDifference {
    years: number;
    months: number;
    date: number;
  }

  /**
   * Calculates the difference between two dates in years, months, and days.
   *
   * @param x - The first date, either as a Date object or a string.
   * @param y - The second date, either as a Date object or a string.
   * @returns An object representing the difference in years, months, and days.
   * 
   * @example
   * ```ts
   * const x = new Date("2025-03-02");
   * const y = new Date("2025-03-01");
   * 
   * const diff = DateUtil.diff(x, y);
   * console.log(diff); // { years: 0, months: 0, date: 1 }
   * ```
   * 
   * @author luke
   * @since 2025.03.02
   */
  export function diff(x: Date | string, y: Date | string): IDifference {
    x = _To_date(x);
    y = _To_date(y);

    const ret: IDifference = {
      years: x.getFullYear() - y.getFullYear(),
      months: x.getMonth() - y.getMonth(),
      date: x.getDate() - y.getDate(),
    };

    if (ret.date < 0) {
      const lastDayOfMonth: number = lastDate(y.getFullYear(), y.getMonth());

      --ret.months;
      ret.date = x.getDate() + (lastDayOfMonth - y.getDate());
    }

    if (ret.months < 0) {
      --ret.years;
      ret.months += 12;
    }

    return ret;
  }

  const LAST_DAY_OF_MONTH: number[] = [
    31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31,
  ];

  export function lastDate(year: number, month: number): number {
    if (month == 1 && year % 4 == 0 && (year % 100 != 0 || year % 400 == 0))
      return 29;
    else return LAST_DAY_OF_MONTH[month];
  }

  export function addYears(date: Date, value: number): Date {
    date = new Date(date);
    date.setFullYear(date.getFullYear() + value);

    return date;
  }

  export function addMonths(date: Date, value: number): Date {
    date = new Date(date);
    
    const year: number = date.getFullYear() + Math.floor((date.getMonth() + value) / 12);
    const month: number = (date.getMonth() + value) % 12;
    const lastDayOfMonth: number = lastDate(year, month - 1);

    if (lastDayOfMonth < date.getDate()) date.setDate(lastDayOfMonth);

    date.setMonth(month - 1);
    return date;
  }

  export function addDays(date: Date, value: number): Date {
    date = new Date(date);
    date.setDate(date.getDate() + value);

    return date;
  }

  function _To_date(date: Date | string): Date {
    if (typeof date === "string") return new Date(date);
    return date;
  }

  function _To_string(val: number): string {
    if (val < 10) return `0${val}`;
    else return val.toString();
  }
}
