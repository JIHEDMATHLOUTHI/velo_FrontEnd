import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Defi } from 'src/app/model/Defi';
import { DefiServiceService } from 'src/app/Service/defi-service.service';
import { map, Observable, Subscriber } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { FileHandle } from 'src/app/model/file_handle.model';
interface CustomWindow extends Window {
  embeddedChatbotConfig?: {
    chatbotId: string;
    domain: string;
  };
}
@Component({
  selector: 'app-register-defi',
  templateUrl: './register-defi.component.html',
  styleUrls: ['./register-defi.component.css']
})

export class RegisterDefiComponent  {

  defi!:Defi



  constructor(
    private defisservice: DefiServiceService ,private router :Router) {}
  showForm: boolean = true;


  onSubmit(productForm: NgForm) {
    // Appeler la méthode addProduct1 avec l'objet product
    this.defisservice.addProduct1(this.defi).subscribe(
      (response: Defi) => {
        console.log('Défi ajouté avec succès:', response);

        this.router.navigate(['/ListDefi']);

        // Afficher une alerte de succès
        Swal.fire('Succès!', 'Défi ajouté avec succès', 'success');
      },
      (error: HttpErrorResponse) => {
        console.error('Erreur lors de l\'ajout du défi:', error);
        // Gérer l'erreur (afficher une alerte, etc.)
      }
    );
  }

}
