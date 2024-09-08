import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Defi } from 'src/app/model/Defi';
import { DefiServiceService } from 'src/app/Service/defi-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AcceptedUsersDialogComponent } from '../accepted-users-dialog/accepted-users-dialog.component';

@Component({
  selector: 'app-list-defi',
  templateUrl: './list-defi.component.html',
  styleUrls: ['./list-defi.component.css']
})
export class ListDefiComponent implements OnInit {


  
  openAcceptedUsersDialog(): void {
    const dialogRef = this.dialog.open(AcceptedUsersDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }





  p:number=1;
    searchTerm: string='' ;
    public productDetails: Defi[] = [];

    constructor(public dialog: MatDialog,private router : Router,private productservice:DefiServiceService){}
    ngOnInit(): void {
      this.getAllDefi();

    }

    public getAllDefi(){
      this.productservice.getAllProduct().
      subscribe(
        (resp:Defi[])=>{
        console.log(resp);
        this.productDetails=resp;
      },(error:HttpErrorResponse )=>{
        console.log(error);
      }
      );
    }

    get filteredProducts() {
      return this.productDetails.filter(product => {
        // Vérifier si product et product.name ne sont pas null avant d'accéder à la propriété name
        if (product && product.pointArrivee) {
          // Filtrer les produits en fonction du terme de recherche
          return product.pointArrivee.toLowerCase().includes(this.searchTerm.toLowerCase());
        }
        return false;
      });
    }


    goToProduct(id: any) {
      this.router.navigate(['/detailsdefi', id]); // Utilisez /:id pour définir le paramètre d'ID dans l'URL
    }


    formData: FormData = new FormData();


    product!:Defi ;


    /////////////////////////
    showLoadButton = false;







}
