import {NgbCalendar, NgbDate, NgbDatepickerModule, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap'
/**
 * Converts {@link NgbDatepickerModule} to date format(yyyy-mm-dd) acceptable by sql.
 * @param dateValue
 */
export function getDateInStringFormat(dateValue: any) {
  if(dateValue) {
    return `${dateValue.year}-${dateValue.month}-${dateValue.day}`;
  }
  return '';
}

export function getMinDate(today?:Date): NgbDateStruct {
  const initialDate = today ?? new Date();
  return {
    year: initialDate.getFullYear(),
    month: initialDate.getMonth() + 1,
    day: initialDate.getDate()
  };
}

export function disableWeekends(calender: NgbCalendar,
                                 date: NgbDate): boolean {
  const dayOfWeek = calender.getWeekday(date);
  return dayOfWeek === 6 || dayOfWeek === 7;
}
