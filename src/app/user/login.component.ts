import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from './user';

import { AuthService } from './auth.service';

import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  loginFailed: boolean = false;

  user: User = new User();

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  login(): void {
    if( this.loginForm.valid ) {
      // console.log(this.loginForm.get('username')?.value);
      // console.log(this.loginForm.get('password')?.value);
      // console.log(this.loginForm.value);
      // console.log('Login: ' + JSON.stringify(this.loginForm.value));      

      this.authService.login(this.loginForm.value).subscribe({
        next: response => {
          // Handle successful login, store the token, or perform other actions.
          // console.log('Login successful');
          // console.log('username:', response?.username);
          // console.log('JWT token:', response?.token);

          this.loginFailed = false;
          this.router.navigateByUrl('/products');      
        },
        error: error => {
          // Handle login error, display a message, or redirect to an error page.
          // console.error('Login error:', error);
          this.loginFailed = true;          
        }
      });      
    }
  }



}
