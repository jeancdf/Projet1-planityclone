import { Component, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    public router: Router,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    const token = localStorage.getItem("auth-token");
    this.isLoggedIn = !!token;
    this.changeDetectorRef.detectChanges(); // Manually trigger change detection
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("auth-user");
    localStorage.removeItem("role");
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
    this.changeDetectorRef.detectChanges(); // Manually trigger change detection
  }

  isLogged(): boolean {
    return !!localStorage.getItem("token");
  }

  isNotLogged(): boolean {
    return !this.isLogged();
  }

  // Example: Check if the user is a student
  isSalon(): boolean {
    const userRole = localStorage.getItem("userRole");
    return userRole === "salon";
  }

  // Example: Check if the user is an admin
  isAdmin(): boolean {
    const userRole = localStorage.getItem("userRole");
    return userRole === "admin";
  }

  // Example: Check if the user is a teacher
  isClient(): boolean {
    const userRole = localStorage.getItem("userRole");
    return userRole === "client";
  }


}
