import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ScheduelItem } from 'src/app/models/schedule-item';

@Component({
  selector: 'schedule-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './schedule-section.component.html',
  styleUrls: ['./schedule-section.component.scss']
})

export class ScheduleSectionComponent implements OnInit {


  @Input()
  name: string

  @Input()
  section: ScheduelItem

  @Output()
  select = new EventEmitter<any>()

  constructor() { }

  ngOnInit() {
 

  }
  onSelect(type: string, assigned: any[] = []) {
   
    const data = this.section
    this.select.emit({
      type, assigned, data
    })
  }

  getNames(list:any){
    return list.map(item=>item.name);
  }
}
