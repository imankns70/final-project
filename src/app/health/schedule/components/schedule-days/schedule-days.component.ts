import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'schedule-days',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './schedule-days.component.html',
  styleUrls: ['./schedule-days.component.scss']
})
export class ScheduleDaysComponent implements OnInit  {
_selected:number;
counter:number=1;
  days: string[] = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  @Input()
  set selected (selected: number){
   
   this._selected=selected
  }

  @Output()
  select = new EventEmitter<number>()
  constructor() { }

   
  ngOnInit() {
  
  }
  selectDay(index: number) {
 
    this.select.emit(index)
  }
}
