import { Component, Input, OnInit } from '@angular/core';
import { Meal } from 'src/app/models/Meal';

@Component({
  selector: 'list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  toggled = false;
  @Input()
  item: any
  constructor() { }

  ngOnInit() {
 
  }
  getRoute(item: any) {
    return [`../meals`, item.id];
  }
  removeItem() {

  }
  toggle() {
    this.toggled = !this.toggled
  }
}
