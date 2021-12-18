import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { ScheduelItem } from 'src/app/models/schedule-item';

@Component({
  selector: 'schedule-calender',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './schedule-calendar.component.html',
  styleUrls: ['./schedule-calendar.component.scss']
})
export class ScheduleCalenderComponent implements OnInit, OnChanges {

  selectedDayIndex: number;
  selectedDay: Date;
  selectedWeek: Date;


  sections = [

    { key: 'morning', name: 'Morning' },
    { key: 'lunch', name: 'Lunch' },
    { key: 'evening', name: 'Evening' },
    { key: 'dinner', name: 'Dinner and Drinks' },
  ]
  @Input()
  set date(date: Date) {
    this.selectedDay = new Date(date.getTime())

  }

  @Input()
  items: ScheduelItem[]

  @Output()
  change = new EventEmitter<Date>()

  @Output()
  select = new EventEmitter<any>()

  constructor() { }
  ngOnChanges() {
 
 
    this.selectedDayIndex = this.getToday(this.selectedDay);
    this.selectedWeek = this.getStartOfWeek(new Date(this.selectedDay))

  }
  ngOnInit() {

  }
  selectSection({ type, assigned, data }: any, sectionKey) {
    const day = this.selectedDay;   
    this.select.emit({
      type,
      assigned,
      sectionKey,
      day,
      data
    })
  }
  getSection(name: string): ScheduelItem {
    return this.items.find(item => item.section == name);

  }
  onChange(weekOffset: number) {

    const startOfWeek = this.getStartOfWeek(new Date());
    const startDate = (
      new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate())
    );
    startDate.setDate(startDate.getDate() + (weekOffset * 7));
    this.change.emit(startDate);
  }

  selectDay(index: number) {
    const selectedDay = new Date(this.selectedWeek);
    selectedDay.setDate(selectedDay.getDate() + index);
    this.change.emit(selectedDay);
  }
  private getStartOfWeek(data: Date) {
    // get day of the week
    const day = data.getDay();
    // get day of the month
    const diff = data.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(data.setDate(diff));

  }
  private getToday(date: Date) {
    let today = date.getDay() - 1;

    if (today < 0) {
      today = 6;
    }
    return today;
  }
}
