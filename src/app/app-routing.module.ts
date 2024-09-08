import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketplaceComponent } from './MarketPlacee/marketplace/marketplace.component';
import { RegisterProductComponent } from './MarketPlacee/register-product/register-product.component';
import { ProductResolveBackService } from './image/product-resolve-back.service';
import { DetaitlsbackComponent } from './MarketPlacee/detaitlsback/detaitlsback.component';
import { AlltemplatefrontComponent } from './FrontOffice/alltemplatefront/alltemplatefront.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfilComponent } from './profil/profil.component';
import { AuthGuardService } from './Service/auth-guard.service';
import { RegisterDefiComponent } from './Defi/register-defi/register-defi.component';
import { ListDefiComponent } from './Defi/list-defi/list-defi.component';
import { DetailsDefiComponent } from './Defi/details-defi/details-defi.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path:'',component:AlltemplatefrontComponent, children:[

    {path: 'ListDefi', component: ListDefiComponent,  canActivate: [AuthGuardService]},/////////////////
    {path: 'detailsdefi/:id',  canActivate: [AuthGuardService],component: DetailsDefiComponent },
    {path: 'registerDefi',  canActivate: [AuthGuardService], component: RegisterDefiComponent},
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'signup', component: SignupComponent },
  {
    path: 'profile',canActivate: [AuthGuardService],

    component: ProfilComponent,

  },


  {path:'marketplace',  canActivate: [AuthGuardService],component: MarketplaceComponent},
  {path:'registerproduct',  canActivate: [AuthGuardService] ,component: RegisterProductComponent},
  {path: 'detailback', component: DetaitlsbackComponent ,resolve: { product: ProductResolveBackService }},

]},




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
