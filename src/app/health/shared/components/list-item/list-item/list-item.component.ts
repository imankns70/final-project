import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Meal } from 'src/app/models/Meal';

@Component({
  selector: 'list-item',
  templateUrl: './list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  toggled = false;

  @Input()
  item: any;

  @Output()
  remove = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {

  }
  getRoute() {
    return [`../meals`, this.item.id];
  }
  removeItem() {

    this.remove.emit(this.item);
  }
  toggle() {
    this.toggled = !this.toggled
  }
}
