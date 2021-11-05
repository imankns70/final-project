import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiResult } from 'src/app/api-result';
import { AuthService } from '../shared/services/auth/auth.service';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  error: string;
  private subscription= new Subscription();
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  loginuser(event: FormGroup) {

    const { email, password } = event.value;
    this.subscription.add(
    this.authService.loginUser(email, password).subscribe((data: ApiResult) => {
      if (data.isSuccess) {
       
        //back to home
        this.router.navigate(['/'])
      } else {
        this.error = data.message.join(',');
      }
    })
    )
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
