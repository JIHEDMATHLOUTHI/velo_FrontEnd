import { Component } from '@angular/core';
import { AuthService } from '../Service/auth.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DefiServiceService } from '../Service/defi-service.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {
  constructor(private datePipe: DatePipe,private dialog :MatDialog ,private authService: AuthService,private router : Router,private defiservice:DefiServiceService) {}

  logout() {
    this.authService.logout(); // Appelle la méthode de déconnexion
  }

ngOnInit(): void {

  this.getPoints1();

     }



     loggedInUser: string | null = null;




points :number = 0;
  error: string | null = null;


getPoints1() {
  this.defiservice.calculatePoints1().subscribe(
    (response) => {
      this.points = response;
    },
    (error) => {
      console.error('Error calculating points', error);
      this.error = 'Failed to calculate points. Please try again later.';
    }
  );
}
}
