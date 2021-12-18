import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'schedule-controls',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './schedule-controls.component.html',
  styleUrls: ['./schedule-controls.component.scss']
})
export class ScheduleControlsComponent implements OnInit {
  private _selected: Date;
  offset = 0;

  @Input()
  set selected(selected: Date) {
 
    this._selected = selected;
  };
  get selected() {
    return this._selected;
  }
  @Output()
  move = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {

  }
  moveDate(offset: number) {

    this.offset = offset;
    this.move.emit(this.offset)
  }
}
