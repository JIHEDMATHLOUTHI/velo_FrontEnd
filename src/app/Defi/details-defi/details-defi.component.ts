import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Defi } from 'src/app/model/Defi';
import { DefiServiceService } from 'src/app/Service/defi-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-details-defi',
  templateUrl: './details-defi.component.html',
  styleUrls: ['./details-defi.component.css']
})
export class DetailsDefiComponent {

  defi!: Defi;

  constructor(private activatedRoute: ActivatedRoute, private defiService: DefiServiceService ) { }



  id:any


  ngOnInit(): void {

  this.id = this.activatedRoute.snapshot.params['id'];
  // Fetch product using the id
  this.defiService.getProductById(this.id).subscribe((defi: Defi) => {
    this.defi = defi;
  });

  }




  reserverDefi(id: number): void {
    this.defiService.participer(id).subscribe(
      response => {
        console.log('Participation effectuée avec succès :', response);
        Swal.fire('Success!', 'participe avec succes.', 'success');

        // Traitez la réponse ou effectuez d'autres actions nécessaires ici
      },
      error => {
        console.error('Erreur lors de la réservation :', error);
        Swal.fire('Success!', 'Reservation  envoyee avec success.', 'success');

        // Gérez l'erreur ici, par exemple afficher un message à l'utilisateur
      }
    );
  }









}
