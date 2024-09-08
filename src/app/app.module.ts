import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MarketplaceComponent } from './MarketPlacee/marketplace/marketplace.component';
import { RegisterProductComponent } from './MarketPlacee/register-product/register-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { CommonModule, DatePipe } from '@angular/common';
import { DetaitlsbackComponent } from './MarketPlacee/detaitlsback/detaitlsback.component';
import { MatCardModule } from '@angular/material/card';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavbarFrontComponent } from './FrontOffice/navbar-front/navbar-front.component';
import { AlltemplatefrontComponent } from './FrontOffice/alltemplatefront/alltemplatefront.component';
import { FooterfrontComponent } from './FrontOffice/footerfront/footerfront.component'; // Importez NgxPaginationModule depuis ngx-pagination

import { MatDatepickerModule } from '@angular/material/datepicker';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ProfilComponent } from './profil/profil.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { IconModule } from '@acpaas-ui/ngx-icon';


import { RegisterDefiComponent } from './Defi/register-defi/register-defi.component';
import { ListDefiComponent } from './Defi/list-defi/list-defi.component';
import { DetailsDefiComponent } from './Defi/details-defi/details-defi.component';
import { AcceptedUsersDialogComponent } from './Defi/accepted-users-dialog/accepted-users-dialog.component';





@NgModule({
  declarations: [
    AppComponent,
    MarketplaceComponent,
    RegisterProductComponent,
    DetaitlsbackComponent,

    NavbarFrontComponent,
    AlltemplatefrontComponent,
    FooterfrontComponent,

    SignupComponent,
    LoginComponent,
    ProfilComponent,

    RegisterDefiComponent,
    ListDefiComponent,
    DetailsDefiComponent,
    AcceptedUsersDialogComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatStepperModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    HttpClientModule,
    IconModule,
    FormsModule,
    MatGridListModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    CommonModule,
    MatCardModule,
    NgxPaginationModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
