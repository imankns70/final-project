import { Component, EventEmitter, Input, OnInit, Output,ChangeDetectionStrategy } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  @Input()
  user: User;

  @Output()
  logOut = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }
  logOutUser() {
    this.logOut.emit()
  }
}
