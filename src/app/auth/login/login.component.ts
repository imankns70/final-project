import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiResult } from 'src/app/api-result';
import { AuthService } from '../shared/services/auth/auth.service';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  error: string;
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  loginuser(event: FormGroup) {
    const { email, password } = event.value
    this.authService.loginUser(email, password).subscribe((data: ApiResult) => {
      if (data.isSuccess) {
        //back to home
        this.router.navigate(['/'])
      } else {
        this.error = data.message.join(',');
      }
    })
  }
}
