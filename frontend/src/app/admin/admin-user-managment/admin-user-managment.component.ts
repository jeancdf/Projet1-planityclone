import { Component } from '@angular/core';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-admin-user-managment',
  templateUrl: './admin-user-managment.component.html',
  styleUrls: ['./admin-user-managment.component.css']
})
export class AdminUserManagmentComponent {
  users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Client' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Salon' },
    { id: 3, name: 'Bob Johnson', email: 'bob', role: 'Client' },
    { id: 4, name: 'Mary Williams', email: 'mary', role: 'Salon' },
    { id: 5, name: 'John Doe', email: 'doe', role: 'Client' },
    { id: 6, name: 'Jane Smith', email: 'smith', role: 'Salon' },
    { id: 7, name: 'Bob Johnson', email: 'johnson', role: 'Client' },
    { id: 8, name: 'Mary Williams', email: 'williams', role: 'Salon' },
    { id: 9, name: 'John Doe', email: 'Doe', role: 'Client' },
  ];

  editUser(userId: number) {
    console.log(`Editing user with ID: ${userId}`);
    // Implement editing logic
  }

  deleteUser(userId: number) {
    console.log(`Deleting user with ID: ${userId}`);
    // Implement deletion logic
  }

  resetPassword(userId: number) {
    console.log(`Resetting password for user with ID: ${userId}`);
    // Implement password reset logic
  }
}
