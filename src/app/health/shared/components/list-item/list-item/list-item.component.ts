import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


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
    return [
      `../${this.item.ingredients ? 'meals' : 'workouts'}`, 
      this.item.id];
  }
  removeItem() {

    this.remove.emit(this.item);
  }
  toggle() {
    this.toggled = !this.toggled
  }
}
