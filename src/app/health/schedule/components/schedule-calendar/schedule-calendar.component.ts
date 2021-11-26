import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'schedule-calender',
  templateUrl: './schedule-calendar.component.html',
  styleUrls: ['./schedule-calendar.component.scss']
})
export class ScheduleCalenderComponent implements OnInit {

  @Input()
  date: Date
  constructor() { }

  ngOnInit() {
 
  }

}
