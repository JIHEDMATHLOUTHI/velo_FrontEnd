import { Component , ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { ProductService } from '../../Service/product.service';
import { Product } from '../../model/product';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from 'src/app/model/file_handle.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
export interface Fruit {
  name: string;
}
@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.component.html',
  styleUrls: ['./register-product.component.css']
})
export class RegisterProductComponent   {
  file = [];
  image:string='';
  public indexImage: object = {};
  formData: FormData = new FormData();
  myForm!: FormGroup;

  product:Product ={
    idProduct:0,
    reference:"",
    name:"",
    quantity:0,
    price:0,
    description:"",
    adresse:"",
    numero:0,
    brand:"",
    imageModels:[],
    deliveryDays:0
  }

  selectedFile: File | undefined;
  productData: Product = {} as Product;
  files: File[] = [];
 // define an empty array of Media objects
 showForm: boolean = true;

 myImage!: Observable<any>;
 base64code!: any;

  constructor( private productService: ProductService ,private router :Router, private sannitizer: DomSanitizer) { }



  onSubmit(productForm :NgForm) {

    const preparedFormData=this.preparedFormData(this.product);
    this.productService.addProduct(preparedFormData).subscribe(
      (response :Product) => {
        console.log('Produit ajouté avec succès');

        // Rediriger vers la liste des produits
        this.router.navigate(['/marketplace']);

        // Afficher une alerte de succès
        Swal.fire('Success!', 'Produit ajouté avec succès', 'success');
        // Réinitialiser le formulaire ou rediriger vers une autre page
      },
      (error:HttpErrorResponse) => {
        console.log(error);
        console.error('Erreur lors de l\'ajout du produit:', error);
        // Gérer l'erreur
      }
    );
  }

  preparedFormData(product :Product):FormData{
    const formData =new FormData();
    formData.append(
      'product',
      new Blob ([JSON.stringify(product)], {type :'application/json'})
);
        for(var i = 0 ;i <product.imageModels.length; i++){
          formData.append(
            'imageFile',
            product.imageModels[i].file,
            product.imageModels[i].file.name
          );
        }
        return formData;
  }


  onChange = ($event: Event) => {
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    //console.log(file)
    this.convertToBase64(file)
  }
  convertToBase64(file: File) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber)
    })
    observable.subscribe((d) => {
      // console.log(d)
      this.myImage = d
      this.base64code = d
    })
  }
  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file)
    filereader.onload = () => {
      subscriber.next(filereader.result)
      subscriber.complete()
    }
    filereader.onerror = () => {
      subscriber.error()
      subscriber.complete()
    }

  }



  onFileSelectedd(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];

      const FileHandle:FileHandle ={
        file:file,
        url:this.sannitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }
      this.product.imageModels.push(FileHandle);
    }
  }
  removeImage(i:number){
    this.product.imageModels.splice(i,1)
  }





}

