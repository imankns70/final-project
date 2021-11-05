import { Component, OnInit } from '@angular/core';
import { Store } from './store';
import { Observable } from 'rxjs';
import { User } from './models/user';
import { AuthService } from './auth/shared/services/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user$: Observable<User>;

  constructor(
    private router: Router,
    private store: Store,
    private authService: AuthService) { }

  ngOnInit() {

    this.user$ = this.store.select<User>('user');

    const userLoggedin = this.authService.getUserLoggein();
    if (userLoggedin) {
      this.store.set('user', userLoggedin)
    }
  }
  onLogout() {
   this.authService.logOut();
   this.store.set('user', null);
   this.router.navigate(['/auth/login']);
  }
}
