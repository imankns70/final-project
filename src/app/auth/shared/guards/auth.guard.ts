import { Injectable } from "@angular/core";
import { CanActivate, CanLoad, Router } from "@angular/router";
import { map } from "rxjs/operators";
import { AuthService } from "../services/auth/auth.service";


@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
    constructor(
        private router: Router,
        private authService: AuthService

    ) { }
    canLoad(){
        return this.authService.isLoggin.pipe(
            map(isLogin => {
                if (!isLogin) {
                    this.router.navigate(['/auth/login'])
                }
                return isLogin
            })
        ) 
    }
    canActivate() {
        return this.authService.isLoggin.pipe(
            map(isLogin => {
                if (!isLogin) {
                    this.router.navigate(['/auth/login'])
                }
                return isLogin
            })
        )
    }
   
}