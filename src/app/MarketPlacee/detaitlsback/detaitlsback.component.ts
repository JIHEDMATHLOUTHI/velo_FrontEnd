import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../Service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../model/product';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { DefiServiceService } from 'src/app/Service/defi-service.service';

@Component({
  selector: 'app-detaitlsback',
  templateUrl: './detaitlsback.component.html',
  styleUrls: ['./detaitlsback.component.css']
})
export class DetaitlsbackComponent implements OnInit {




  selectProductIndex = 0;
  product!: Product;

  constructor(private DefiServiceService:DefiServiceService,private activatedRoute: ActivatedRoute,private productService: ProductService) {}

  ngOnInit(): void {

   this.product = this.activatedRoute.snapshot.data['product'];

    this.getpoint()
  }

  changeIndex(index:any){
    this.selectProductIndex=index;
  }



  totalCarpoolings: number = 0;


  payement(): void {
    // Appel de la méthode pay et envoi de l'email uniquement après la réussite du paiement
    this.pay(this.product.price)
      .then(() => {
        // Une fois le paiement terminé, on envoie l'email
        alert('Email sent successfully!!');
        return this.sendEmailToAdmin();
      })

      .catch((error) => {
        console.error('Erreur lors du paiement ou de l\'envoi de l\'email', error);
      });
  }

  sendEmailToAdmin(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const htmlContent = this.generateProductHtml();

      const emailRequest = {
        to: 'oversizeofficialtn.1@gmail.com',
        subject: 'New Order Received',
        text: htmlContent
      };

      this.productService.sendEmail(emailRequest).subscribe(
        response => {
          console.log('Email sent to admin successfully', response);
          resolve(); // Résoudre la promesse lorsque l'email est envoyé
        },
        error => {
          console.error('Error sending email to admin', error);
          reject(error); // Rejeter la promesse en cas d'erreur
        }
      );
    });
  }
  pageNumber: number = 0;

  generateProductHtml(): string {
    let text = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Products Received</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                color: #333;
                background-color: #f8f8f8; /* Couleur de fond */
                padding: 20px;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff; /* Couleur de fond du conteneur */
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); /* Ombre légère */
            }
            h2 {
                color: #007bff; /* Couleur du titre */
                text-align: center;
            }
            .product-card {
                border: 1px solid #ddd;
                border-radius: 8px;
                padding: 15px;
                margin-bottom: 20px;
                background-color: #fff;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            .product-image {
                width: 100px;
                height: auto;
                margin-bottom: 10px;
                display: block;
                margin-left: auto;
                margin-right: auto;
            }
            .product-name {
                font-size: 18px;
                font-weight: bold;
                color: #333;
                margin-bottom: 10px;
                text-align: center;
            }
            .product-brand {
                color: #666;
                margin-bottom: 5px;
                text-align: center;
            }
            .product-price {
                color: #28a745; /* Couleur du prix */
                font-weight: bold;
                text-align: center;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>New Products Received</h2>

            <!-- Boucle sur les produits pour afficher les cartes -->

            <div class="product-card">
            <img src="https://cdn.pixabay.com/photo/2021/03/19/13/40/online-6107598_640.png" alt="Produit technologique">



        </div>
    </body>
    </html>

    `;


    text += `
          </div>
      </body>
      </html>
    `;

    return text;
  }

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
    const discountedPrice = originalPrice - totalDiscount;
      console.log("points   ",this.totalCarpoolings);


    // Assurer que le prix après réduction est positif
    return Math.max(discountedPrice, 0);
  }

  handler:any = null;
  payEnabled: boolean = false;

  pay(amount: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      // Vérifier si le script Stripe est chargé
      if (this.handler === null) {
        // Si Stripe n'est pas encore chargé, charger Stripe d'abord
        this.loadStripe().then(() => {
          // Stripe est chargé, on peut maintenant effectuer le paiement
          this.startPayment(amount, resolve, reject);
        }).catch(error => {
          console.error('Erreur lors du chargement de Stripe:', error);
          reject(error);
        });
      } else {
        // Si Stripe est déjà chargé, on démarre directement le paiement
        this.startPayment(amount, resolve, reject);
      }
    });
  }

  // Méthode pour démarrer le paiement
  startPayment(amount: any, resolve: Function, reject: Function) {
    const handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51HxRkiCumzEESdU2Z1FzfCVAJyiVHyHifo0GeCMAyzHPFme6v6ahYeYbQPpD9BvXbAacO2yFQ8ETlKjo4pkHSHSh00qKzqUVK9',
      locale: 'auto',
      token: (token: any) => {
        console.log(token);
        alert('Payment Success!!');
        this.payEnabled = true;
        resolve();
      }
    });

    handler.open({
      name: 'Velo',
      description: 'Your order description',
      amount: amount * 100 // Stripe prend le montant en centimes
    });
  }

  loadStripe(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!window.document.getElementById('stripe-script')) {
        const s = window.document.createElement("script");
        s.id = "stripe-script";
        s.type = "text/javascript";
        s.src = "https://checkout.stripe.com/checkout.js";
        s.onload = () => {
          this.handler = (<any>window).StripeCheckout;
          resolve(); // Stripe chargé avec succès
        };
        s.onerror = (error) => {
          reject(error); // Erreur lors du chargement de Stripe
        };
        window.document.body.appendChild(s);
      } else {
        resolve(); // Si le script est déjà chargé, on peut directement continuer
      }
    });
  }
}


