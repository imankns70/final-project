import { Component, OnInit } from '@angular/core';
import { Store } from './store';
import { Observable } from 'rxjs';
import { User } from './models/user';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user$: Observable<User>;

  constructor(private store: Store) { }

  ngOnInit() {
    this.user$ = this.store.select<User>('user');
  }

}
