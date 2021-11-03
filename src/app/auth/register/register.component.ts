import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiResult } from 'src/app/api-result';
import { AuthService } from '../shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  error: string
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {

  }
  registerUser(event: FormGroup) {
    const { email, password } = event.value;
    this.authService.createUser(email, password)
      .subscribe({
        next: (apiResult: ApiResult) => {
          if (!apiResult.isSuccess) {
            this.error = apiResult.message.join('.')
          } else {
            //back to home
            this.router.navigate(['/'])
          }
        },
        error: (err) => console.log(err),
        complete: () => console.log('completed!!!!')
      }

      );
  }
}
