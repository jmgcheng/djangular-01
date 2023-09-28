import { Component } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  username: string | undefined = this.authService.getUsername();

  constructor(private authService: AuthService, private router: Router) {}

  logOut(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

}
