import { Component, Input, OnInit } from '@angular/core';
import { Meal } from 'src/app/models/Meal';

@Component({
  selector: 'list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  @Input()
  item:any
  constructor() { }

  ngOnInit() {
  }

}
