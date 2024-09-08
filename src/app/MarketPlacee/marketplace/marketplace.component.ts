import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../Service/product.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Product } from '../../model/product';
import { map } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageProcessingService } from 'src/app/image/image-processing.service';
import { DefiServiceService } from 'src/app/Service/defi-service.service';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.css']
})
export class MarketplaceComponent implements OnInit {
p:number=1;
  public productDetails: Product[] = [];

  constructor(private DefiServiceService:DefiServiceService,private router : Router,private productservice:ProductService,private imageProcessingService:ImageProcessingService){}

  ngOnInit(): void {
    this.getAllProduct();
    this.getpoint()


  }


  public getAllProduct(){
    this.productservice.getAllProduct().
    pipe(
     map((products: Product[],i) => products.map((product: Product) => this.imageProcessingService.createImages(product)))

    ).
    subscribe(
      (resp:Product[])=>{
      console.log(resp);
        

      this.productDetails=resp;
    },(error:HttpErrorResponse )=>{
      console.log(error);
    }
    );
  }


  searchTerm: string='' ;

  get filteredProducts() {
    return this.productDetails.filter(product => {
      // Filtrer les produits en fonction du terme de recherche
      return product.name.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }



  goToProduct(id:any){
    this.router.navigate(['/detailback',{id:id}]);
  }

  formData: FormData = new FormData();


  product!:Product ;

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formData.append('image', file);
    }
  }

totalCarpoolings: number = 0;

getpoint(){
  this.DefiServiceService.calculatePoints1().subscribe(
    (total: number) => {
      this.totalCarpoolings = total;
      console.log("your  points :" ,this.totalCarpoolings);
      this.calculateDiscountForAllProducts();
    },
    (error: any) => {
      console.log(error);
    }
  );
}
calculateDiscountForAllProducts() {
  // Assurez-vous que totalCarpoolings est défini
  if (this.totalCarpoolings === null || this.totalCarpoolings === undefined) {
    console.error("Le nombre total de points n'est pas défini.");
    return;
  }

  // Supposons que vous avez une liste de produits appelée 'products'
  // Vous pouvez la remplacer par la liste de produits réelle que vous utilisez
  const products: any[] = [/* liste de produits */];

  // Parcours de tous les produits pour calculer la réduction
  products.forEach(product => {
    // Vérifiez si le produit a un prix défini
    if (product.price === null || product.price === undefined) {
      console.error("Le prix du produit n'est pas défini :", product);
      return;
    }

    // Calculer la réduction pour ce produit
    const discountedPrice = this.calculateDiscount(product.price);
    console.log("Réduction pour le produit", product.name, ":", discountedPrice);
    // Vous pouvez affecter le prix réduit au produit si nécessaire
    // product.discountedPrice = discountedPrice;
  });
}

calculateDiscount(originalPrice: number): number {
  // Supposons que chaque point donne une réduction de 0.1 dt
  const discountPerPoint = 0.05;

  // Calculer la réduction totale en fonction du nombre de points obtenus
  const totalDiscount = this.totalCarpoolings * discountPerPoint;


  // Assurer que la réduction totale ne dépasse pas le prix original


  // Assurer que le prix après réduction est positif
  return Math.max(totalDiscount, 0);
}

}
