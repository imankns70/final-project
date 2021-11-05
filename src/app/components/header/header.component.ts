import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private selectedUser: User;

  @Input()
   set user(value: User) {
  
    this.selectedUser = value
  }

  get user(): User {
    
    return this.selectedUser
  }

  @Output()
  logOut = new EventEmitter<any>();
 
  

  constructor() { }

  ngOnInit() {
  
  }
  logOutUser() {
    this.logOut.emit()
  }
}
